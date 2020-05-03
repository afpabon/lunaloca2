import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Modal, Button } from 'react-bootstrap';
import EditImage from './EditImage';
import { setLoadingStatus } from '../../actions/loadingStatus';

import { cancelImageEditing, saveImage } from '../../actions/carousel';

const EditImageModal = ({
  image,
  imageData,
  cancelImageEditing,
  saveImage,
  setLoadingStatus,
}) => {
  const [saving, setSaving] = useState(false);
  const onSubmit = async () => {
    setSaving(true);
    setLoadingStatus(true);
    await saveImage(imageData, image);
    setSaving(false);
    setLoadingStatus(false);
  };

  return (
    <Modal show={imageData !== null} onHide={() => cancelImageEditing()}>
      <Modal.Header closeButton>
        <Modal.Title>Editar imagen</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <EditImage />
      </Modal.Body>

      <Modal.Footer>
        <Button variant='secondary' onClick={() => cancelImageEditing()}>
          Cerrar
        </Button>
        <Button
          type='button'
          className='btn btn-highlight'
          onClick={() => onSubmit()}
          disabled={saving}
        >
          Registrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

EditImageModal.propTypes = {
  image: PropTypes.object,
  cancelImageEditing: PropTypes.func.isRequired,
  saveImage: PropTypes.func.isRequired,
  setLoadingStatus: PropTypes.func.isRequired,
};

EditImageModal.defaultProps = {
  image: null,
};

const mapStateToProps = state => ({
  image: state.carousel.editingImage,
  imageData: state.carousel.editingImageData,
});

export default connect(
  mapStateToProps,
  { cancelImageEditing, saveImage, setLoadingStatus },
)(EditImageModal);
