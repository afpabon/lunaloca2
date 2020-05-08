import _ from 'lodash';
import React from 'react';
import { uuid } from 'uuidv4';
import { connect } from 'react-redux';
import RemoteImage from '../layout/RemoteImage';
import NavigationButtons from './NavigationButtons';

import { updateTemporaryValue } from '../../actions/quotation';

const formatOption = option =>
  `${_.get(option, 'name')} (${new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
  }).format(_.get(option, 'price'))})`;

const Element = ({
  stepWizard,
  index,
  elements,
  temporaryValues,
  updateTemporaryValue,
}) => {
  const selectedId = _.get(temporaryValues, `element_${index}`);
  const element = _.find(elements, e => e.index === index);
  const options = _.get(element, 'options');
  const selectedOption = _.find(options, o => o.id === selectedId);
  return (
    <div>
      <h3 className='text-center'>Selecciona la opción que más te guste</h3>
      <div className='row'>
        <div className='col-md-6 col-xs-12'>
          <div className='wizard-inner-container'>
            <ul className='list-group'>
              {!element.required && (
                <li
                  className={`wizard-list-link list-group-item ${
                    selectedId === null ? 'active' : ''
                  }`}
                  key={uuid()}
                  onClick={() => {
                    updateTemporaryValue(`element_${index}`, null);
                  }}
                >
                  Nada
                </li>
              )}
              {_.map(options, option => (
                <li
                  className={`wizard-list-link list-group-item ${
                    _.get(option, 'id') === selectedId ? 'active' : ''
                  }`}
                  key={uuid()}
                  onClick={() => {
                    updateTemporaryValue(
                      `element_${index}`,
                      _.get(option, 'id'),
                    );
                  }}
                >
                  {formatOption(option)}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className='col-md-6 col-xs-12'>
          {_.get(selectedOption, 'url') && (
            <RemoteImage
              img={_.get(selectedOption, 'url')}
              alt={_.get(selectedOption, 'name')}
              height={250}
            />
          )}
        </div>
      </div>
      <div className='row pt-4'>
        <div className='col-md-6 col-xs-12'>
          <p>{_.get(selectedOption, 'description')}</p>
        </div>
        <div className='col-md-6 col-xs-12'>
          <NavigationButtons stepWizard={stepWizard} />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  elements: state.quotation.elements,
  temporaryValues: state.quotation.temporaryValues,
});

export default connect(
  mapStateToProps,
  { updateTemporaryValue },
)(Element);
