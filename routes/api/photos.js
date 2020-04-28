const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { multerUploads, dataUri } = require('../../middleware/multer');
const { uploader } = require('../../config/cloudinary');

const Photo = require('../../models/Photo');

// @route    POST api/photos
// @desc     Create and upload a photo
// @access   Private
router.post('/', [multerUploads, auth], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    if (!req.file) {
      console.log('Image file is required');
      res.status(500).send('Server error');
    }
    const {
      description,
      categories,
      starred,
      quotable,
      baseid,
      tags,
    } = req.body;

    const newPhoto = new Photo({
      description,
      categories,
      starred,
      quotable,
      baseid,
      tags,
    });

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

    const post = await newPhoto.save();

    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    GET api/photos/:category/:starred
// @desc     Get photos by category
// @access   Public
router.get('/category/:categoryId', async (req, res) => {
  try {
    const id = parseInt(req.params.categoryId);
    const photos = await Photo.find({
      categories: id,
    }).select('url description');

    res.json(photos);
  } catch (err) {
    console.error(err.message);

    res.status(500).send('Server Error');
  }
});

// @route    GET api/photos/:category/:starred
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
