const _ = require('lodash');
const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

const { Category } = require('../../models/Category');
const QuotationBase = require('../../models/QuotationBase');

const crunchElements = (elements, decorationElement) =>
  _.map(
    _.sortBy(_.filter(elements, e => e.index !== 99), e => e.index),
    (e, i) => ({
      ...e,
      index: i + 1,
    }),
  ).concat(
    decorationElement || {
      index: 99,
      name: 'Decoración',
    },
  );

// @route    GET api/category/menu
// @desc     Get all categories for menu
// @access   Public
router.get('/menu', async (err, res) => {
  try {
    const categories = await Category.find({ onmenu: true })
      .sort({ publicid: 1 })
      .select({ publicid: 1, name: 1 });
    res.json(
      categories.concat([
        {
          publicid: 99,
          name: 'Otros',
        },
      ]),
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    GET api/category/elements/:id
// @desc     Get all elements for category
// @access   Public
router.get('/elements/:id', async (err, res) => {
  try {
    const category = await Category.findById(req.param.id);
    if (!category) {
      return res.status(404).message('Category not found');
    }
    res.json({
      elements: _.sortBy(category.elements, 'index'),
      sizes: category.validsizes,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    GET api/category
// @desc     Get all categories for admin list
// @access   Private
router.get('/', auth, async (err, res) => {
  try {
    const categories = await Category.find().sort({ publicid: 1 });
    res.json(categories);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    POST api/category
// @desc     Add a category
// @access   Private
router.post(
  '/',
  [
    auth,
    check(
      'publicid',
      'Public id is required, and must be a number greater than 0',
    ).isInt([{ min: 1 }]),
    check('name', 'Name is required')
      .not()
      .isEmpty(),
    check('units', 'Name is required')
      .not()
      .isEmpty(),
    check('validsizes.*', 'All valid sizes must be greater than 0').isInt([
      { min: 1 },
    ]),
    check(
      'elements.*.index',
      'All elements must have an index greater than 0',
    ).isInt([{ min: 1 }]),
    check('elements.*.name', 'All elements must have names')
      .not()
      .isEmpty(),
    check(
      'validsizes',
      'Valid sizes must be an array at least 1 element long',
    ).isArray(1),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { publicid, name, onmenu, units, validsizes, elements } = req.body;

      const exists = await Category.exists({ publicid });
      if (exists) {
        return res
          .status(401)
          .send('Category with that public id already exists');
      }

      const newCategory = new Category({
        publicid,
        name,
        onmenu: onmenu || false,
        units,
        validsizes: _.uniq(_.sortBy(validsizes)),
        elements: crunchElements(elements),
      });

      const category = await newCategory.save();

      res.json(category);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },
);

// @route    PUT api/category/:id
// @desc     Modify a category
// @access   Private
router.put(
  '/:id',
  [
    auth,
    check(
      'publicid',
      'Public id is required, and must be a number greater than 0',
    ).isInt([{ min: 1 }]),
    check('name', 'Name is required')
      .not()
      .isEmpty(),
    check('units', 'Name is required')
      .not()
      .isEmpty(),
    check('validsizes.*', 'All valid sizes must be greater than 0').isInt([
      { min: 1 },
    ]),
    check(
      'elements.*.index',
      'All elements must have an index greater than 0',
    ).isInt([{ min: 1 }]),
    check('elements.*.name', 'All elements must have names')
      .not()
      .isEmpty(),
    check(
      'validsizes',
      'Valid sizes must be an array at least 1 element long',
    ).isArray(1),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { publicid, name, onmenu, units, validsizes, elements } = req.body;

      const category = await Category.findById(req.params.id);

      if (!category) {
        res.status(404).send('Category not found');
      }

      /*const providedElementIds = _.map(_.filter(elements, el => el._id), el =>
        el._id.toString(),
      );
      const elementsToRemove = _.map(
        _.filter(
          category.elements,
          el => providedElementIds.indexOf(el._id.toString()) < 0,
        ),
        el => el._id,
      );

      await QuotationBase.findByIdAndDelete({
        element: { $in: elementsToRemove },
      });*/

      const decorationElement = _.find(category.elements, e => e.index === 99);
      category.publicid = publicid;
      category.name = name;
      category.onmenu = onmenu || false;
      category.units = units;
      category.validsizes = _.uniq(_.sortBy(validsizes));
      category.elements = crunchElements(elements, decorationElement);

      await category.save();

      res.json(category);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },
);

// @route    DELETE api/category/:id
// @desc     Delete a category
// @access   Private
router.delete('/:id', [auth], async (req, res) => {
  try {
    const result = await Category.findOneAndRemove({ _id: req.params.id });
    if (!result) {
      return res.status(404).send('Category not found');
    }
    await QuotationBase.remove({
      category: req.params.id,
    });
    res.send('Category removed');
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
