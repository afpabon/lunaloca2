import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { register } from '../../actions/auth';
import { Redirect } from 'react-router-dom';

const initialFormData = {
  first_name: '',
  last_name: '',
  email: '',
  password: '',
  password2: '',
};

const Register = ({ register, isAuthenticated }) => {
  const [formData, setFormData] = useState(initialFormData);

  const { first_name, last_name, email, password, password2 } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    if (password !== password2) {
      Swal.fire('Contraseña errada', 'Las contraseñas no coinciden', 'danger');
    } else {
      register({ first_name, last_name, email, password });
    }
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
              type='text'
              className='form-control'
              placeholder='Nombre(s) *'
              name='first_name'
              value={first_name}
              onChange={e => onChange(e)}
              required
            />
          </div>
          <div className='form-group'>
            <input
              type='text'
              className='form-control'
              placeholder='Apellido(s) *'
              name='last_name'
              value={last_name}
              onChange={e => onChange(e)}
              required
            />
          </div>
          <div className='form-group'>
            <input
              type='email'
              className='form-control'
              placeholder='Email *'
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
              placeholder='Contraseña *'
              name='password'
              value={password}
              onChange={e => onChange(e)}
            />
          </div>
          <div className='form-group'>
            <input
              type='password'
              className='form-control'
              placeholder='Confirmar Contraseña *'
              name='password2'
              value={password2}
              onChange={e => onChange(e)}
            />
          </div>
          <div className='float-right'>
            <button type='submit' className='btn btn-highlight'>
              Registrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

Register.propTypes = {
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(
  mapStateToProps,
  { register },
)(Register);
