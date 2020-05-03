import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MultiSelect from 'react-multi-select-component';
import { GALLERY_GROUP, getGalleryLabelById } from '../../constants/enums';

import { updateImageData } from '../../actions/carousel';

const options = Object.values(GALLERY_GROUP).map(key => ({
  label: getGalleryLabelById(key),
  value: key,
}));

const CategoriesField = ({ imageData, updateImageData }) => {
  const categories =
    imageData && imageData.categories
      ? imageData.categories.map(category => ({
          label: getGalleryLabelById(category),
          value: category,
        }))
      : [];

  const onCategoriesChange = selected =>
    updateImageData({
      ...imageData,
      categories: selected.map(category => parseInt(category.value)),
    });

  return (
    <MultiSelect
      options={options}
      value={categories}
      onChange={e => onCategoriesChange(e)}
    />
  );
};

CategoriesField.propTypes = {
  imageData: PropTypes.object,
  updateImageData: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  imageData: state.carousel.editingImageData,
});

export default connect(
  mapStateToProps,
  { updateImageData },
)(CategoriesField);
