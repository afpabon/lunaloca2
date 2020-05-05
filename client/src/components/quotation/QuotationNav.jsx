import React from 'react';

const QuotationNav = ({ totalSteps, currentStep }) => {
  const dots = [];
  for (let i = 1; i <= totalSteps; i += 1) {
    const isActive = currentStep === i;
    dots.push(
      <span
        key={`step-${i}`}
        className={`${styles.dot} ${isActive ? styles.active : ''}`}
        onClick={() => props.goToStep(i)}
      >
        &bull;
      </span>,
    );
  }

  return <div className='quotation-nav'>{dots}</div>;
};

export default QuotationNav;
