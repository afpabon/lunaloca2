const _ = require('lodash');
const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { multerUploads, dataUri } = require('../../middleware/multer');
const { uploader } = require('../../config/cloudinary');
const fs = require('fs');
const path = require('path');
const Handlebars = require('handlebars');
const nodemailer = require('nodemailer');
const config = require('config');

const Photo = require('../../models/Photo');
const { Category } = require('../../models/Category');
const QuotationBase = require('../../models/QuotationBase');

const transformImage = image => {
  const { categories, tags } = image;

  let newCategories = [];
  if (categories && Array.isArray(categories)) {
    newCategories = categories.map(c => parseInt(c));
  } else if (categories) {
    newCategories = [parseInt(categories)];
  }

  let newTags = [];
  if (tags) {
    newTags = tags.split(',');
  }

  return {
    description: image.description,
    categories: newCategories,
    starred: image.starred,
    quotable: image.quotable,
    baseid: image.baseid,
    tags: newTags,
  };
};

// @route    GET api/photos/quotationBases/:categories
// @desc     Get all decoration quotation bases by categories
// @access   Private
router.get('/quotationBases/:categories', auth, async (req, res) => {
  try {
    const categories = await Category.find({
      publicid: { $in: req.params.categories.split(',') },
    });
    const orList = _.map(categories, c => ({
      category: c._id.toString(),
    }));
    _.forEach(orList, item => {
      const category = _.find(
        categories,
        c => c._id.toString() === item.category,
      );
      if (!category) {
        return res.status(404).send('Category does not exist');
      }
      item.element = _.get(
        _.find(category.elements, e => e.index === 99),
        '_id',
      );
    });
    const quotationBases = await QuotationBase.find({
      $or: orList,
    })
      .sort({ name: 1 })
      .select({ name: 1 });
    res.json(quotationBases);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    GET api/photos/category/:categoryId
// @desc     Get photos by category
// @access   Public
router.get('/category/:categoryId', async (req, res) => {
  try {
    const id = parseInt(req.params.categoryId);
    if (id !== 99) {
      const photos = await Photo.find({
        categories: id,
      }).select('url description quotable baseid');

      res.json(photos);
    } else {
      const existingIds = await Category.find({}).select({ publicid: 1 });
      const photos = await Photo.find({
        categories: { $nin: existingIds.map(i => i.publicid) },
      }).select('url description quotable baseid');

      res.json(photos);
    }
  } catch (err) {
    console.error(err.message);

    res.status(500).send('Server Error');
  }
});

// @route    GET api/photos/starred
// @desc     Get photos by category
// @access   Public
router.get('/starred', async (req, res) => {
  try {
    const photos = await Photo.find({
      starred: true,
    }).select('url description');

    res.json(photos);
  } catch (err) {
    console.error(err.message);

    res.status(500).send('Server Error');
  }
});

// @route    POST api/photos
// @desc     Create and upload a photo
// @access   Private
router.post('/', [multerUploads, auth], async (req, res) => {
  try {
    if (!req.file) {
      console.log('Image file is required');
      res.status(500).send('Server error');
    }
    const { tags } = req.body;

    const newPhoto = new Photo(transformImage(req.body));

    const file = dataUri(req).content;

    const image = await uploader.upload(file, { tags });
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

    newPhoto.url = url;

    const photo = await newPhoto.save();

    res.json(photo);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    PUT api/photos
// @desc     Update photo data
// @access   Private
router.put('/', [auth], async (req, res) => {
  try {
    const {
      description,
      categories,
      starred,
      quotable,
      baseid,
      tags,
    } = req.body;

    const photo = await Photo.findByIdAndUpdate(
      { _id: req.body._id },
      {
        description,
        categories,
        starred,
        quotable,
        baseid,
        tags,
      },
    );

    res.json(photo);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    GET api/photos/:id
// @desc     Get photo by id
// @access   Private
router.get('/:id', auth, async (req, res) => {
  try {
    const photo = await Photo.findById(req.params.id);

    if (!photo) {
      res.status(404).message('photo not found');
    }

    res.json(photo);
  } catch (err) {
    console.error(err.message);

    res.status(500).send('Server Error');
  }
});

// @route    GET api/photos/tags/:search
// @desc     Get available tags
// @access   Private
router.get('/tags/:search', async (req, res) => {
  try {
    const regex = new RegExp(`^${req.params.search}`, 'i');
    const tags = await Photo.aggregate([
      { $match: { tags: regex } },
      { $project: { tags: 1 } },
      { $unwind: '$tags' },
      { $match: { tags: regex } },
      { $sort: { tags: 1 } },
      { $group: { _id: null, uniqueValues: { $addToSet: '$tags' } } },
    ]);

    res.json(tags && tags.length ? tags[0].uniqueValues : []);
  } catch (err) {
    res.status(500).send('server error');
  }
});

// @route    DELETE api/photos/:id
// @desc     Delete a photo
// @access   Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const photo = await Photo.findById(req.params.id);

    const urlParts = photo.url.split('/');
    const publicId = urlParts[urlParts.length - 1].split('.')[0];

    await uploader.destroy(publicId);
    await photo.remove();

    res.json({ msg: 'Photo removed' });
  } catch (err) {
    console.error(err.message);

    res.status(500).send('Server Error');
  }
});

// @route    POST api/photos/sendquotation
// @desc     Send email with quotation information
// @access   Public
router.post('/sendquotation', async (req, res) => {
  try {
    const { photoInfo, contact, size, elements } = req.body;

    const transporter = nodemailer.createTransport({
      service: config.get('emailService'),
      auth: {
        user: config.get('emailUser'),
        pass: config.get('emailPassword'),
      },
    });

    const getSelectedElement = element =>
      _.find(_.get(element, 'options'), o => o.id === element.selected);

    const details = _.map(
      elements,
      element =>
        `${_.get(element, 'element')}: ${_.get(
          getSelectedElement(element),
          'name',
        )} (${_.get(getSelectedElement(element), 'price')})`,
    ).join(' / ');

    const total = _.reduce(
      elements,
      (sum, element) => sum + _.get(getSelectedElement(element), 'price', 0),
      0,
    );

    const locals = {
      name: _.get(contact, 'name'),
      phone: _.get(contact, 'phone'),
      email: _.get(contact, 'email'),
      address: _.get(contact, 'address'),
      neighborhood: _.get(contact, 'neighborhood'),
      expectedDate: _.get(contact, 'expectedDate'),
      notes: _.get(contact, 'notes'),
      photoUrl: `${config.get('cloudinaryUrlPrefix')}/h_300/${_.get(
        photoInfo,
        'url',
      )}}`,
      photoDescription: _.get(photoInfo, 'description'),
      size,
      details,
      total,
    };

    const source = fs.readFileSync(
      path.join(__dirname, '../../templates/quotation.hbs'),
      'utf8',
    );
    const template = Handlebars.compile(source);

    const mailOptions = {
      from: config.get('emailUser'),
      to: config.get('emailUser'),
      subject: 'Cotización Lunaloca',
      html: template(locals),
    };

    const { error, info } = await transporter.sendMail(mailOptions);
    if (error) {
      console.log(error);
      res.status(500).send('Server Error');
    } else {
      res.json({ status: true, message: 'Email sent' });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
