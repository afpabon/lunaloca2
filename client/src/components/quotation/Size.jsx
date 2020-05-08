import _ from 'lodash';
import React, { useState } from 'react';
import { uuid } from 'uuidv4';
import { connect } from 'react-redux';
import NavigationButtons from './NavigationButtons';

import { updateTemporaryValue } from '../../actions/quotation';

const Size = ({
  units,
  availableSizes,
  size,
  stepWizard,
  temporaryValues,
  updateTemporaryValue,
}) => {
  const [selectedSize, setSelectedSize] = useState(size);
  return (
    <div className='quotation-container'>
      <div>
        <h3 className='text-center'>¿Cuánto necesitas?</h3>
        <div className='row'>
          <div className='col-md-6 col-xs-12'>
            <p className='pt-5 pl-2 pr-3'>
              Para poder estimar el precio total del producto que necesitas, por
              favor indícanos el tamaño que deseas.
            </p>
          </div>
          <div className='col-md-6 col-xs-12'>
            <div className='wizard-inner-container'>
              <ul className='list-group'>
                {_.map(availableSizes, available => (
                  <li
                    className={`wizard-list-link list-group-item ${
                      available === selectedSize ? 'active' : ''
                    }`}
                    key={uuid()}
                    onClick={() => {
                      setSelectedSize(available);
                      updateTemporaryValue('size', available);
                    }}
                  >
                    {`${available} ${units}`}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className='text-center'>
          <NavigationButtons
            stepWizard={stepWizard}
            allowNext={_.get(temporaryValues, 'size', null) !== null}
          />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  units: state.quotation.units,
  availableSizes: state.quotation.availableSizes,
  size: state.quotation.size,
  temporaryValues: state.quotation.temporaryValues,
});

export default connect(
  mapStateToProps,
  { updateTemporaryValue },
)(Size);
