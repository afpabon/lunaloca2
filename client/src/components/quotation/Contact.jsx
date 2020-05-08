import _ from 'lodash';
import { uuid } from 'uuidv4';
import React from 'react';
import { connect } from 'react-redux';
import { ListGroup } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import NavigationButtons from './NavigationButtons';

import {
  getSelectedOption,
  getTotal,
  formatPrice,
  updateQuotationContact,
} from '../../actions/quotation';

import 'react-datepicker/dist/react-datepicker.css';

const MIN_DAYS_DELTA = 2;

const Contact = ({
  stepWizard,
  contact,
  photoInfo,
  elements,
  updateQuotationContact,
}) => {
  const {
    name,
    phone,
    email,
    address,
    neighborhood,
    expectedDate,
    notes,
  } = contact;

  const total = getTotal(elements);

  const minDate = () => {
    const date = new Date();
    date.setDate(date.getDate() + MIN_DAYS_DELTA);
    return date;
  };

  return (
    <div className='quotation-container'>
      <div>
        <p>
          Por favor cuéntanos cómo podemos contactarte, y para cuando necesitas
          el producto.
        </p>
        <div className='row'>
          <div className='col-md-6 col-xs-12'>
            <div className='form-group'>
              <input
                type='text'
                className={`form-control ${!name && 'border-danger'}`}
                placeholder='Nombre *'
                name='name'
                value={name}
                onChange={e => updateQuotationContact('name', e.target.value)}
                required
              />
            </div>
            <div className='form-group'>
              <input
                type='email'
                className='form-control'
                placeholder='Email'
                name='email'
                value={email}
                onChange={e => updateQuotationContact('email', e.target.value)}
              />
              <small id='emailHelp' className='form-text text-muted'>
                Nunca compartiremos tu email con nadie más.
              </small>
            </div>
            <div className='form-group'>
              <input
                type='text'
                className={`form-control ${!phone && 'border-danger'}`}
                placeholder='Teléfono *'
                name='phone'
                value={phone}
                onChange={e => updateQuotationContact('phone', e.target.value)}
                required
              />
            </div>
            <div className='form-group'>
              <input
                type='text'
                className='form-control'
                placeholder='Dirección'
                name='address'
                value={address}
                onChange={e =>
                  updateQuotationContact('address', e.target.value)
                }
              />
            </div>
            <div className='form-group'>
              <input
                type='text'
                className='form-control'
                placeholder='Barrio'
                name='neighborhood'
                value={neighborhood}
                onChange={e =>
                  updateQuotationContact('neighborhood', e.target.value)
                }
              />
            </div>
            <div className='form-group'>
              <DatePicker
                selected={expectedDate}
                onChange={date => updateQuotationContact('expectedDate', date)}
                minDate={minDate()}
                dateFormat='dd/MM/yyyy'
                placeholderText='Fecha de entrega'
              />
            </div>
            <div className='form-group'>
              <textarea
                className='form-control'
                placeholder='Notas'
                name='notes'
                value={notes}
                onChange={e => updateQuotationContact('notes', e.target.value)}
                required
                rows={8}
              />
            </div>{' '}
          </div>
          <div className='col-md-6 col-xs-12'>
            <h4>Resumen de tu producto</h4>
            <p className='strong'>{_.get(photoInfo, 'description')}</p>
            <ListGroup key={uuid()}>
              {_.map(elements, element => (
                <ListGroup.Item key={uuid()}>
                  <div className='row'>
                    <div className='col-md-8'>
                      <span className='strong text-main'>
                        {_.get(element, 'element')}
                      </span>
                      <br />
                      <span className='text-highlight'>
                        {getSelectedOption(element)
                          ? _.get(getSelectedOption(element), 'name')
                          : 'Nada'}
                      </span>
                    </div>
                    <div className='col-md-4 text-main'>
                      {getSelectedOption(element) &&
                        formatPrice(_.get(getSelectedOption(element), 'price'))}
                    </div>
                  </div>
                </ListGroup.Item>
              ))}
              <ListGroup.Item key={uuid()}>
                <div className='row'>
                  <div className='col-md-8'>
                    <span className='strong text-main'>TOTAL</span>
                  </div>
                  <div className='col-md-4 text-main'>{formatPrice(total)}</div>
                </div>
              </ListGroup.Item>
            </ListGroup>
            <div className='row mt-5'>
              <NavigationButtons
                stepWizard={stepWizard}
                allowNext={name && phone}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  contact: state.quotation.contact,
  elements: state.quotation.elements,
  photoInfo: state.quotation.photoInfo,
});

export default connect(
  mapStateToProps,
  { updateQuotationContact },
)(Contact);
