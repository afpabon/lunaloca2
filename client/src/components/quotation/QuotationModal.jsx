import React from 'react';
import { connect } from 'react-redux';
import { Modal } from 'react-bootstrap';
import Quotation from './Quotation';

import { resetQuotation } from '../../actions/quotation';

const QuotationModal = ({ photoInfo, resetQuotation }) => (
  <Modal show={photoInfo !== null} onHide={resetQuotation} size='lg'>
    <Modal.Header closeButton>
      <Modal.Title>Cotizar producto</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Quotation />
    </Modal.Body>
  </Modal>
);

const mapStateToProps = state => ({
  photoInfo: state.quotation.photoInfo,
});

export default connect(
  mapStateToProps,
  { resetQuotation },
)(QuotationModal);
