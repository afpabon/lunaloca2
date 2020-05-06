import _ from 'lodash';
import { uuid } from 'uuidv4';
import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import StepWizard from 'react-step-wizard';
import { setLoadingStatus } from '../../actions/loadingStatus';

import QuotationNav from './QuotationNav';
import FirstStep from './FirstStep';
import Size from './Size';
import Element from './Element';
import Contact from './Contact';
import Confirmation from './Confirmation';

import { setQuotationSize, setQuotationElement } from '../../actions/quotation';

const Quotation = ({
  category,
  size,
  elements,
  contact,
  temporaryValues,
  setQuotationSize,
  setQuotationElement,
  setLoadingStatus,
}) => {
  const [steps, setSteps] = useState([]);
  const [stepWizard, setStepWizard] = useState();

  const wizardObj = useRef();

  useEffect(() => {
    if (stepWizard) {
      const innerElements = [];
      innerElements.push(<FirstStep key={uuid()} stepWizard={stepWizard} />);
      innerElements.push(<Size key={uuid()} stepWizard={stepWizard} />);
      _.forEach(_.filter(elements, e => e.index !== 99), e => {
        innerElements.push(
          <Element
            key={uuid()}
            index={e.index}
            name={e.name}
            stepWizard={stepWizard}
          />,
        );
      });
      innerElements.push(<Contact key={uuid()} stepWizard={stepWizard} />);
      innerElements.push(<Confirmation key={uuid()} />);
      setSteps(innerElements);
    }
  }, [elements.length, stepWizard]);

  const onStepChange = async stats => {
    // Validate steps
    const firstRequiredUnmet = _.find(
      _.filter(elements, e => e.required),
      e => !e.selected && !_.get(temporaryValues, `element_${e.index}`),
    );

    if (stats.activeStep > 2 && !size && !_.get(temporaryValues, 'size')) {
      wizardObj.current.goToStep(2);
    } else if (stats.activeStep > elements.length + 1 && firstRequiredUnmet) {
      wizardObj.current.goToStep(firstRequiredUnmet.index + 2);
    } else if (
      stats.activeStep === elements.length + 3 &&
      (!_.get(contact, 'name') || !_.get(contact, 'phone'))
    ) {
      wizardObj.current.goToStep(elements.length + 2);
    }

    // Update redux data from temporaryValues
    if (stats.previousStep === 2 && size !== _.get(temporaryValues, 'size')) {
      setLoadingStatus(true);
      await setQuotationSize(category, _.get(temporaryValues, 'size'));
      setLoadingStatus(false);
    } else if (
      stats.previousStep > 2 &&
      stats.previousStep < elements.length + 2 &&
      _.get(
        _.find(elements, e => e.index === stats.previousStep - 2),
        'selected',
      ) !== _.get(temporaryValues, `element_${stats.previousStep - 2}`)
    ) {
      setLoadingStatus(true);
      await setQuotationElement(
        category,
        size,
        stats.previousStep - 2,
        _.get(temporaryValues, `element_${stats.previousStep - 2}`),
      );
      setLoadingStatus(false);
    }
  };

  return (
    <div className='container'>
      <div className={'jumbotron'}>
        <div className='row'>
          <div className='col-md-12 col-sm-6 offset-sm-3}'>
            <StepWizard
              nav={<QuotationNav />}
              instance={instance => setStepWizard(instance)}
              onStepChange={onStepChange}
              ref={wizardObj}
            >
              {steps}
            </StepWizard>
          </div>
        </div>
      </div>
    </div>
  );
};

Quotation.propTypes = {
  category: PropTypes.number,
  size: PropTypes.number,
  elements: PropTypes.array.isRequired,
  contact: PropTypes.object,
  temporaryValues: PropTypes.object.isRequired,
  setQuotationSize: PropTypes.func.isRequired,
  setLoadingStatus: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  category: state.quotation.category,
  size: state.quotation.size,
  elements: state.quotation.elements,
  contact: state.quotation.contact,
  temporaryValues: state.quotation.temporaryValues,
});

export default connect(
  mapStateToProps,
  { setQuotationSize, setQuotationElement, setLoadingStatus },
)(Quotation);
