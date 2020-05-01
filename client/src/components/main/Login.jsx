import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { login } from '../../actions/auth';

const initialFormData = {
  email: '',
  password: '',
};

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState(initialFormData);

  const { email, password } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    login(email, password);
  };

  if (isAuthenticated) {
    return <Redirect to='/' />;
  }

  return (
    <div className='col-md-12 bg-light'>
      <div className='row m-2 bordered-container'>
        <form className='w-100' onSubmit={e => onSubmit(e)}>
          <div className='form-group'>
            <input
              type='email'
              className='form-control'
              placeholder='Email'
              name='email'
              value={email}
              onChange={e => onChange(e)}
              required
            />
          </div>
          <div className='form-group'>
            <input
              type='password'
              className='form-control'
              placeholder='Contraseña'
              name='password'
              value={password}
              onChange={e => onChange(e)}
            />
          </div>
          <div className='float-right'>
            <button type='submit' className='btn btn-highlight'>
              Ingresar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(
  mapStateToProps,
  { login },
)(Login);
