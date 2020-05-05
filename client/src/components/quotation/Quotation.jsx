import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import StepWizard from 'react-step-wizard';

import QuotationNav from './QuotationNav';
import FirstStep from './FirstStep';

export const Quotation = () => {
  return (
    <div className='container'>
      <div className={'jumbotron'}>
        <div className='row'>
          <div className='col-12 col-sm-6 offset-sm-3}'>
            <StepWizard nav={<QuotationNav />}>
              <FirstStep />
            </StepWizard>
          </div>
        </div>
      </div>
    </div>
  );
};

Quotation.propTypes = {
  prop: PropTypes,
};

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Quotation);
