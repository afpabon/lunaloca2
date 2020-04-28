const config = require('config');
const cloudinary = require('cloudinary').v2;

const cloudinaryConfig = () =>
  cloudinary.config({
    cloud_name: config.get('cloudinaryCloudName'),
    api_key: config.get('cloudinaryApiKey'),
    api_secret: config.get('cloudinarySecret'),
  });

module.exports = {
  cloudinaryConfig: cloudinaryConfig,
  uploader: cloudinary.uploader,
};
