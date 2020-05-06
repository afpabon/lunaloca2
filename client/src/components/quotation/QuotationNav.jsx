import _ from 'lodash';
import { uuid } from 'uuidv4';
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

const QuotationNav = ({
  elements,
  size,
  contact,
  totalSteps,
  currentStep,
  goToStep,
}) => {
  const [steps, setSteps] = useState([]);

  useEffect(() => {
    const innerElements = [];
    innerElements.push('Producto');
    innerElements.push('Tamaño');
    _.forEach(_.filter(elements, e => e.index !== 99), e => {
      innerElements.push(e.element);
    });
    innerElements.push('Contacto');
    innerElements.push('Confirma');
    setSteps(innerElements);
  }, [elements]);

  const allRequiredSet = _.every(
    _.filter(elements, e => e.required),
    e => e.selected,
  );

  const formRequiredMet =
    _.get(contact, 'name') && _.get(contact, 'phone') && true;

  const dots = [];
  for (let i = 1; i <= totalSteps; i += 1) {
    const isActive = currentStep === i;
    if (
      (size || i < 3) &&
      (allRequiredSet || i < 2 + elements.length) &&
      (formRequiredMet || i < elements.length + 3)
    ) {
      dots.push(
        <span
          key={uuid()}
          className={`dot ${isActive ? 'active' : ''}`}
          onClick={() => goToStep(i)}
        >
          {_.get(steps, i - 1)}
        </span>,
      );
    } else {
      dots.push(
        <span className='inactive-dot' key={uuid()}>
          {_.get(steps, i - 1)}
        </span>,
      );
    }
  }

  return <div className='quotation-nav'>{dots}</div>;
};

const mapStateToProps = state => ({
  elements: state.quotation.elements,
  size: state.quotation.size,
  contact: state.quotation.contact,
});

export default connect(mapStateToProps)(QuotationNav);
