import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { resetQuotation } from '../../actions/quotation';

const NavigationButtons = ({
  stepWizard,
  allowNext = true,
  resetQuotation,
}) => {
  return (
    <div className='btn-toolbar' role='toolbar'>
      <div className='btn-group mr-2' role='group'>
        <button className={'btn btn-secondary'} onClick={resetQuotation}>
          Cancelar
        </button>
      </div>
      <div className='btn-group mr-2' role='group'>
        <button
          className={'btn btn-highlight'}
          onClick={stepWizard.nextStep}
          disabled={!allowNext}
        >
          Continuar
        </button>
      </div>
    </div>
  );
};

NavigationButtons.propTypes = {
  resetQuotation: PropTypes.func.isRequired,
  stepWizard: PropTypes.object,
};

export default connect(
  null,
  { resetQuotation },
)(NavigationButtons);
