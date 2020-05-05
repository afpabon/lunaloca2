import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import StepWizard from 'react-step-wizard';

export const Quotation = () => {
  return <div></div>;
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
