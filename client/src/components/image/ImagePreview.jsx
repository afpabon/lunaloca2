import React from 'react';
import PropTypes from 'prop-types';

const generatePreview = image => URL.createObjectURL(image);

const ImagePreview = ({ imagefile }) => (
  <div key={imagefile.name} className='render-preview'>
    <div className='image-container'>
      <img
        src={generatePreview(imagefile)}
        alt={imagefile.name}
        className='container-fluid'
        style={{
          maxHeight: 250,
          maxWidth: 400,
          width: 'auto',
          height: 'auto',
        }}
      />
    </div>
    <div className='details'>
      {imagefile.name} - {(imagefile.size / 1024000).toFixed(2)}MB
    </div>
  </div>
);

ImagePreview.propTypes = {
  imagefile: PropTypes.object,
};

export default ImagePreview;
