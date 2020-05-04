import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import QuotationsBySizes from './QuotationsBySizes';

import {
  cancelEditQuotationBase,
  updateQuotationBase,
  saveQuotationBase,
} from '../../actions/quotationBases';

export const EditQuotationBase = ({
  sizes,
  quotationBase,
  cancelEditQuotationBase,
  updateQuotationBase,
  saveQuotationBase,
}) => {
  const { name, description, quotationbysizes } = quotationBase;

  const onChange = e =>
    updateQuotationBase({ ...quotationBase, [e.target.name]: e.target.value });

  return (
    <Modal
      show={quotationBase.isNew !== undefined}
      onHide={cancelEditQuotationBase}
      className='modal-container'
    >
      {quotationBase !== null && (
        <>
          <Modal.Body>
            <div className='form-group'>
              <div className='form-group'>
                <label htmlFor='name'>Nombre</label>
                <input
                  type='text'
                  className='form-control'
                  placeholder='Nombre'
                  value={name}
                  id='name'
                  name='name'
                  onChange={e => onChange(e)}
                />
              </div>
              <div className='form-group'>
                <label htmlFor='name'>Descripción</label>
                <textarea
                  className='form-control'
                  placeholder='Descripción'
                  value={description}
                  id='description'
                  name='description'
                  onChange={e => onChange(e)}
                  rows={8}
                />
              </div>
              <div className='form-group'>
                <QuotationsBySizes
                  availableSizes={sizes}
                  quotations={quotationbysizes}
                  onQuotationsChanged={quotations =>
                    updateQuotationBase({
                      ...quotationBase,
                      quotationbysizes: quotations,
                    })
                  }
                />
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              type='button'
              className='btn btn-warning'
              onClick={cancelEditQuotationBase}
            >
              Cerrar
            </Button>
            <Button
              type='button'
              className='btn btn-highlight'
              onClick={() => saveQuotationBase(quotationBase)}
            >
              Guardar
            </Button>
          </Modal.Footer>
        </>
      )}
    </Modal>
  );
};

EditQuotationBase.propTypes = {
  quotationBase: PropTypes.object.isRequired,
  cancelEditQuotationBase: PropTypes.func.isRequired,
  updateQuotationBase: PropTypes.func.isRequired,
  saveQuotationBase: PropTypes.func.isRequired,
  sizes: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
  quotationBase: state.quotationBases.editingQuotationBase,
  sizes: state.main.sizes,
});

const mapDispatchToProps = {
  cancelEditQuotationBase,
  updateQuotationBase,
  saveQuotationBase,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditQuotationBase);
