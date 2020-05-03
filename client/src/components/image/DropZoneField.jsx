import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useDropzone } from 'react-dropzone';
import ImagePreview from './ImagePreview';
import Placeholder from './Placeholder';

const DropZoneField = ({ handleOnDrop, imagefile }) => {
  const onDrop = useCallback(acceptedFiles => handleOnDrop(acceptedFiles), [
    handleOnDrop,
  ]);
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div className='preview-container'>
      <div {...getRootProps()} className='dropzone-inner'>
        <input {...getInputProps()} />
        {imagefile && imagefile.length > 0 ? (
          <ImagePreview imagefile={imagefile[0]} />
        ) : (
          <Placeholder />
        )}
      </div>
    </div>
  );
};

DropZoneField.propTypes = {
  handleOnDrop: PropTypes.func.isRequired,
  input: PropTypes.shape({
    name: PropTypes.string,
    onBlur: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    onDragStart: PropTypes.func.isRequired,
    onDrop: PropTypes.func.isRequired,
    onFocus: PropTypes.func.isRequired,
    value: PropTypes.shape({
      preview: PropTypes.string,
    }),
  }),
  imagefile: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)),
  label: PropTypes.string,
  touched: PropTypes.bool,
  error: PropTypes.string,
};

export default DropZoneField;
