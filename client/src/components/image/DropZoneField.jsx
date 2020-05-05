import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useDropzone } from 'react-dropzone';
import ImagePreview from './ImagePreview';
import Placeholder from './Placeholder';
import { CLOUDINARY } from '../../constants/config';

const DropZoneField = ({ handleOnDrop, imagefile, initialImage }) => {
  const onDrop = useCallback(acceptedFiles => handleOnDrop(acceptedFiles), [
    handleOnDrop,
  ]);
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  let innerControl = <Placeholder />;

  if (imagefile && imagefile.length > 0) {
    innerControl = <ImagePreview imagefile={imagefile[0]} />;
  } else if (initialImage && initialImage.length) {
    innerControl = (
      <div className='render-preview'>
        <div className='image-container'>
          <img
            src={`${CLOUDINARY}/h_250,c_fill/${initialImage}`}
            alt='Imagen existente'
          />
        </div>
      </div>
    );
  }

  return (
    <div className='preview-container'>
      <div {...getRootProps()} className='dropzone-inner'>
        <input {...getInputProps()} />
        {innerControl}
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
  initialImage: PropTypes.string,
  label: PropTypes.string,
  touched: PropTypes.bool,
  error: PropTypes.string,
};

export default DropZoneField;
