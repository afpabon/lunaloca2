import React from 'react';
import { connect } from 'react-redux';
import LoadingOverlay from 'react-loading-overlay';

const MainLoadingOverlay = props => {
  return (
    <LoadingOverlay active={props.loading} spinner text='Procesando...'>
      {props.children}
    </LoadingOverlay>
  );
};

const mapStateToProps = state => ({
  loading: state.loadingStatus.loading,
});

export default connect(mapStateToProps)(MainLoadingOverlay);
