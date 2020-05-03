import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Modal, Button } from 'react-bootstrap';
import RemoteImage from './RemoteImage';

import { resetCurrentEnlargedImage } from '../../actions/carousel';

const EnlargedImageModal = ({
  image,
  editingImage,
  resetCurrentEnlargedImage,
  removingImage,
}) => {
  const [height, setHeight] = useState(window.innerHeight);
  const [width, setWidth] = useState(window.innerWidth);

  const updateWindowDimensions = () => {
    setHeight(window.innerHeight);
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', updateWindowDimensions);
    return () => {
      window.removeEventListener('resize', updateWindowDimensions);
    };
  });

  const handleClose = () => {
    resetCurrentEnlargedImage();
  };

  const offset =
    100 +
    (image && image.description ? 30 : 0) +
    (image && image.tags ? 16 : 0);

  return (
    <Modal
      show={image !== null && editingImage === null && !removingImage}
      onHide={handleClose}
      className='modal-container custom-map-modal'
      width={width}
    >
      {image !== null && (
        <>
          <Modal.Body>
            <div className='text-center'>
              <RemoteImage
                img={image.url}
                alt={image.description}
                fluid={false}
                height={height - offset}
              />
              <h4>{image.description}</h4>
              {image.tags && <p>{image.tags.join(', ')}</p>}
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant='secondary' onClick={handleClose}>
              Cerrar
            </Button>
          </Modal.Footer>
        </>
      )}
    </Modal>
  );
};

EnlargedImageModal.propTypes = {
  image: PropTypes.object,
  editingImage: PropTypes.object,
  resetCurrentEnlargedImage: PropTypes.func.isRequired,
};

EnlargedImageModal.defaultProps = {
  image: null,
  editingImage: null,
};

const mapStateToProps = state => ({
  image: state.carousel.currentEnlargedImage,
  editingImage: state.carousel.editingImageData,
  removingImage: state.carousel.removingImage,
});

export default connect(
  mapStateToProps,
  { resetCurrentEnlargedImage },
)(EnlargedImageModal);
