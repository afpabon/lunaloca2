const _ = require('lodash');
const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { multerUploads, dataUri } = require('../../middleware/multer');
const { uploader } = require('../../config/cloudinary');

const Photo = require('../../models/Photo');
const { Category } = require('../../models/Category');

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
    const orList = _.map(req.params.categories.split(','), category => ({
      category,
    }));
    const categories = await Category.find({
      _id: { $in: req.params.categories.split(',') },
    });
    _.forEach(orList, item => {
      const category = _.find(categories);
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
      }).select('url description');

      res.json(photos);
    } else {
      const existingIds = await Category.find({}).select({ publicid: 1 });
      const photos = await Photo.find({
        categories: { $nin: existingIds.map(i => i.publicid) },
      }).select('url description');

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
router.get('/:id', [auth], async (req, res) => {
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

module.exports = router;
