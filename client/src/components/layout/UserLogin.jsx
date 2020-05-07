import React from 'react';
import { connect } from 'react-redux';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { logout } from '../../actions/auth';

const UserLogin = ({ isAuthenticated, loading, user, logout }) => {
  const { pathname } = useLocation();

  if (isAuthenticated && !loading) {
    return (
      <>
        <span>Bienvenid@ {user.first_name}</span>
        <Link
          to='/admin/categories'
          className={`dark ml-2 ${
            pathname === '/admin/categories' ? 'active' : ''
          }`}
          title='Administrar categorías'
        >
          <i className='fas fa-layer-group'></i>
        </Link>
        <Link
          to='/admin/quotationbases'
          className={`dark ml-2 ${
            pathname === '/admin/quotationbases' ? 'active' : ''
          }`}
          title='Administrar bases der cotización'
        >
          <i className='fas fa-money-bill-wave'></i>
        </Link>
        <a href='#!' className='dark ml-2' onClick={logout} title='Salir'>
          <i className='fas fa-sign-out-alt'></i>
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
