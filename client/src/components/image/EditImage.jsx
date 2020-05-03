import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import DropZoneField from './DropZoneField';
import TagsField from './TagsField';
import CategoriesField from './CategoriesField';

import { updateImage, updateImageData } from '../../actions/carousel';

const EditImage = ({ image, imageData, updateImage, updateImageData }) => {
  if (!imageData) return null;

  const { description, starred, quotable, baseid } = imageData || {};

  const handleOnDrop = newImageFile => updateImage(newImageFile);

  const onChange = e =>
    updateImageData({ ...imageData, [e.target.name]: e.target.value });

  return (
    <>
      {imageData.isNew && (
        <div className='form-group'>
          <DropZoneField imagefile={image} handleOnDrop={handleOnDrop} />
        </div>
      )}
      <div className='form-group'>
        <textarea
          className='form-control'
          placeholder='Descripción'
          name='description'
          value={description}
          onChange={e => onChange(e)}
          required
          rows={4}
        />
      </div>
      <div className='form-check'>
        <input
          className='form-check-input'
          type='checkbox'
          checked={starred}
          name='starred'
          id='starred'
          onChange={e =>
            updateImageData({ ...imageData, starred: e.target.checked })
          }
        />
        <label className='form-check-label' htmlFor='starred'>
          Destacado
        </label>
      </div>
      <div className='form-group'>
        <TagsField />
      </div>
      <div className='form-group'>
        <CategoriesField />
      </div>
    </>
  );
};

EditImage.propTypes = {
  image: PropTypes.array,
  updateImage: PropTypes.func.isRequired,
  updateImageData: PropTypes.func.isRequired,
};

EditImage.defaultProps = {
  image: null,
};

const mapStateToProps = state => ({
  image: state.carousel.editingImage,
  imageData: state.carousel.editingImageData,
});

export default connect(
  mapStateToProps,
  { updateImage, updateImageData },
)(EditImage);
