import axios from 'axios';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';

import { updateImageData } from '../../actions/carousel';

import 'react-bootstrap-typeahead/css/Typeahead.css';
import 'react-bootstrap-typeahead/css/Typeahead-bs4.css';

const TagsField = ({ imageData, updateImageData }) => {
  const [tagOptions, setTagOptions] = useState([]);
  const [tagsLoading, setTagsLoading] = useState(false);

  const { tags } = imageData || {};

  const onTagsChange = tags => {
    updateImageData({
      ...imageData,
      tags,
    });
  };

  return (
    <AsyncTypeahead
      id='tags'
      multiple
      clearButton
      selected={tags}
      delay={800}
      minLength={2}
      allowNew
      promptText='buscando...'
      searchText='buscando...'
      onChange={e => onTagsChange(e)}
      placeholder='tags'
      isLoading={tagsLoading}
      onSearch={query => {
        setTagsLoading(true);
        axios.get(`/api/photos/tags/${query}`).then(res => {
          if (res.status !== 200) {
            console.log('error');
          } else {
            setTagOptions(res.data);
            setTagsLoading(false);
          }
        });
      }}
      options={tagOptions}
    />
  );
};

TagsField.propTypes = {
  imageData: PropTypes.object,
  updateImageData: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  imageData: state.carousel.editingImageData,
});

export default connect(
  mapStateToProps,
  { updateImageData },
)(TagsField);
