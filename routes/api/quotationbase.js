const _ = require('lodash');
const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const { multerUploads, dataUri } = require('../../middleware/multer');
const { uploader } = require('../../config/cloudinary');

const QuotationBase = require('../../models/QuotationBase');
const { Category } = require('../../models/Category');

// @route    GET api/quotationbase/:categoryid/:previousIndex
// @desc     Get next valid quotation bases from category, size and previous index
// @access   Public
router.get('/:categoryid/:size/:previousIndex', async (req, res) => {
  try {
    const category = await Category.findById(req.params.categoryid);
    if (!category) {
      return res.status(404).send('Category not found');
    }
    const elementIndex = parseInt(req.params.previousIndex);
    const nextElementIndex =
      elementIndex < category.elements.length - 1 ? elementIndex + 1 : 99;
    const nextElement = _.find(
      category.elements,
      e => e.index === nextElementIndex,
    );
    if (!nextElement) {
      return res.status(404).send('Next element available not found');
    }

    const quotationbases = await QuotationBase.find({
      category: req.params.categoryid,
      element: nextElement._id,
    })
      .sort({ name: 1 })
      .select({ name: 1, description: 1, quotationbysizes: 1 });

    const size = parseInt(req.params.size);
    const validquotationbases = _.filter(
      quotationbases,
      qb => _.map(qb.quotationbysizes, qs => qs.size).indexOf(size) >= 0,
    );

    res.json({
      index: nextElement.index,
      element: nextElement.name,
      options: _.map(validquotationbases, qb => ({
        name: qb.name,
        description: qb.description,
        price: _.get(
          _.find(qb.quotationbysizes, p => p.size === size),
          'price',
          null,
        ),
      })),
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    GET api/quotationbase
// @desc     Get all quotation bases for admin by category and element
// @access   Private
router.get('/:categoryid/:elementid', auth, async (req, res) => {
  try {
    const categories = await QuotationBase.find({
      category: req.params.categoryid,
      element: req.params.elementid,
    }).sort({ name: 1 });
    res.json(categories);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    POST api/quotationbase
// @desc     Add a quotation base
// @access   Private
router.post('/', [multerUploads, auth], async (req, res) => {
  try {
    // Validations
    const { category, element, name, description } = req.body;
    const quotationbysizes = JSON.parse(req.body.quotationbysizes);
    const errors = [];
    if (!category || !category.length) {
      errors.push('Category is required');
    }
    if (!element || !element.length) {
      errors.push('Element is required');
    }
    if (!name || !name.length) {
      errors.push('Name is required');
    }
    if (!quotationbysizes || !quotationbysizes.length) {
      errors.push(
        'Quotation by sizes must be an array at least 1 element long',
      );
    }
    _.forEach(quotationbysizes, qs => {
      if (qs.price === undefined || qs.price === null) {
        errors.push('All quotations must have a valid price');
      }
    });
    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    const categoryObj = await Category.findById(category);
    if (!categoryObj) {
      return res.status(401).send('Category does not exist');
    }
    if (
      _.intersection(
        _.map(quotationbysizes, qs => qs.size),
        categoryObj.validsizes,
      ).length !== quotationbysizes.length
    ) {
      return res.status(401).send('Some sizes provided are not allowed');
    }
    const elementIds = categoryObj.elements.map(e => e._id.toString());
    const elementObj = _.find(elementIds, e => e === element);
    if (!elementObj) {
      return res.status(401).send('Element does not exist');
    }

    //Generate new object and upload image to cloudinary
    const newQuotationBase = new QuotationBase({
      category,
      element,
      name,
      description,
      quotationbysizes,
    });

    const file = dataUri(req).content;

    const image = await uploader.upload(file, { description });
    if (!image) {
      console.log('Image not uploaded to cloudinary');
      res.status(500).send('Server error');
    }
    const parts = image.url.split('/');
    if (!parts || parts.length < 2) {
      console.log('Bad image url generated');
      res.status(500).send('Server error');
    }
    const url = `${parts[parts.length - 2]}/${parts[parts.length - 1]}`;

    newQuotationBase.url = url;

    const quotationBase = await newQuotationBase.save();

    res.json(quotationBase);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    PUT api/quotationbase/:id
// @desc     Modify a quotation base
// @access   Private
router.put('/:id', [multerUploads, auth], async (req, res) => {
  try {
    // Validations
    const { name, description } = req.body;
    const quotationbysizes = JSON.parse(req.body.quotationbysizes);
    const errors = [];
    if (!name || !name.length) {
      errors.push('Name is required');
    }
    if (!quotationbysizes || !quotationbysizes.length) {
      errors.push(
        'Quotation by sizes must be an array at least 1 element long',
      );
    }
    _.forEach(quotationbysizes, qs => {
      if (qs.price === undefined || qs.price === null) {
        errors.push('All quotations must have a valid price');
      }
    });
    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    const quotationBase = await QuotationBase.findById(req.params.id);

    const categoryObj = await Category.findById(quotationBase.category);
    if (
      _.intersection(
        _.map(quotationbysizes, qs => qs.size),
        categoryObj.validsizes,
      ).length !== quotationbysizes.length
    ) {
      return res.status(401).send('Some sizes provided are not allowed');
    }

    quotationBase.name = name;
    if (description) quotationBase.description = description;
    quotationBase.quotationbysizes = quotationbysizes;

    if (req.file) {
      if (req.body.url) {
        const urlParts = req.body.url.split('/');
        const publicId = urlParts[urlParts.length - 1].split('.')[0];

        await uploader.destroy(publicId);
      }

      const file = dataUri(req).content;

      const image = await uploader.upload(file, { description });
      if (!image) {
        console.log('Image not uploaded to cloudinary');
        res.status(500).send('Server error');
      }
      const parts = image.url.split('/');
      if (!parts || parts.length < 2) {
        console.log('Bad image url generated');
        res.status(500).send('Server error');
      }
      const url = `${parts[parts.length - 2]}/${parts[parts.length - 1]}`;

      quotationBase.url = url;
    }

    await quotationBase.save();

    res.json(quotationBase);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    DELETE api/quotationbase/:id
// @desc     Delete a quotation base
// @access   Private
router.delete('/:id', [auth], async (req, res) => {
  try {
    const quotationBase = await QuotationBase.findById(req.params.id);
    if (!quotationBase) {
      return res.status(404).send('Quotation base not found');
    }

    if (quotationBase.url) {
      const urlParts = quotationBase.url.split('/');
      const publicId = urlParts[urlParts.length - 1].split('.')[0];

      await uploader.destroy(publicId);
    }

    await quotationBase.remove();

    res.send('Quotation base removed');
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
