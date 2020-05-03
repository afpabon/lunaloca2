import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

const UserLogin = ({ isAuthenticated, loading, user, logout }) => {
  if (isAuthenticated && !loading) {
    return (
      <>
        <span>Bienvenid@ {user.first_name}</span>{' '}
        <a href='#!' className='dark' onClick={logout}>
          <i className='fas fa-sign-out-alt'></i>{' '}
          <span className='hide-sm'>Logout</span>
        </a>
      </>
    );
  }
  return null;
};

UserLogin.propTypes = {
  logout: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  loading: PropTypes.bool.isRequired,
  user: PropTypes.object,
};

UserLogin.defaultProps = {
  isAuthenticated: null,
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.auth.loading,
  user: state.auth.user,
});

export default connect(
  mapStateToProps,
  { logout },
)(UserLogin);
