import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import RemoteImage from '../layout/RemoteImage';
import { Card } from 'react-bootstrap';
import { setLoadingStatus } from '../../actions/loadingStatus';

import {
  getTotal,
  formatPrice,
  sendQuotation,
  resetQuotation,
} from '../../actions/quotation';

const Confirmation = ({
  contact,
  photoInfo,
  size,
  elements,
  sendQuotation,
  resetQuotation,
  setLoadingStatus,
}) => {
  const total = getTotal(elements);

  return (
    <div>
      <div>
        <div className='row'>
          <div className='col-md-6'>
            <Card>
              <Card.Body>
                <Card.Title>Confirma tu producto</Card.Title>
                <Card.Text>A nombre de {_.get(contact, 'name')}</Card.Text>
                <Card.Text>
                  Teléfono de contacto: {_.get(contact, 'phone')}
                </Card.Text>
                {_.get(contact, 'email') && (
                  <Card.Text>{_.get(contact, 'email')}</Card.Text>
                )}
                {(_.get(contact, 'address') ||
                  _.get(contact, 'neighborhood')) && (
                  <Card.Text>
                    {_.get(contact, 'address')}
                    {_.get(contact, 'neighborhood') &&
                      ` (${_.get(contact, 'neighborhood')})`}
                  </Card.Text>
                )}
                {_.get(contact, 'expectedDate') && (
                  <Card.Text>
                    Fecha de entrega requerida:{' '}
                    {_.get(contact, 'expectedDate').toLocaleDateString('es-CO')}
                  </Card.Text>
                )}
                {_.get(contact, 'notes') && (
                  <Card.Text>Notas: {_.get(contact, 'notes')}</Card.Text>
                )}
                <Card.Text>Total: {formatPrice(total)}</Card.Text>
              </Card.Body>
            </Card>
          </div>
          {photoInfo && (
            <div className='col-md-6 text-center'>
              <RemoteImage
                img={photoInfo.url}
                alt={photoInfo.description}
                height={200}
              />
              {photoInfo.description}
              <div className='btn-toolbar mt-4 float-right' role='toolbar'>
                <div className='btn-group mr-2' role='group'>
                  <button
                    className={'btn btn-secondary'}
                    onClick={resetQuotation}
                  >
                    Cancelar
                  </button>
                </div>
                <div className='btn-group mr-2' role='group'>
                  <button
                    className={'btn btn-highlight'}
                    onClick={async () => {
                      setLoadingStatus(true);
                      await sendQuotation(photoInfo, size, elements, contact);
                      setLoadingStatus(false);
                    }}
                  >
                    Confirmar
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  contact: state.quotation.contact,
  size: state.quotation.size,
  elements: state.quotation.elements,
  photoInfo: state.quotation.photoInfo,
});

export default connect(
  mapStateToProps,
  { sendQuotation, resetQuotation, setLoadingStatus },
)(Confirmation);
