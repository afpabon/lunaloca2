import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';
import Swal from 'sweetalert2';
import RemoteImage from '../layout/RemoteImage';

import { setLoadingStatus } from '../../actions/loadingStatus';

const initialFormData = {
  name: '',
  email: '',
  phonenumber: '',
  subject: '',
  message: '',
};

const ContactUs = ({ setLoadingStatus }) => {
  const [formData, setFormData] = useState(initialFormData);

  const { name, email, phonenumber, subject, message } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    setLoadingStatus(true);
    const res = await axios.post('/api/contact', formData);
    setLoadingStatus(false);
    if (res.status === 200) {
      Swal.fire(
        'Datos enviados',
        'Tus datos han sido registrados en nuestro sistema. ¡Muy pronto estaremos en contacto contigo!',
        'success',
      );
      setFormData(initialFormData);
    } else {
      Swal.fire(
        'Error',
        'Ocurrió un error al intentar enviar tus datos. Por favor intenta de nuevo.',
        'error',
      );
    }
  };

  return (
    <>
      <div className='col-md-12 bg-light'>
        <div className='row m-2 bordered-container'>
          <div className='col-md-12 pad-sm'>
            <div className='row'>
              <h1 className='underlined-title'>Contacto.</h1>
            </div>
            <div className='row'>
              <h4>Lunaloca Cupcakes Bogotá</h4>
            </div>
            <div className='row'>
              <a href='mailto:lunalocacupcakes@hotmail.com' className='dark'>
                lunalocacupcakes@hotmail.com
              </a>
            </div>
            <div className='row'>+57 314 4309086</div>
            <div className='row'>
              <a href='http://wa.me/3144309086'>
                <img
                  src='https://img.icons8.com/office/30/000000/whatsapp.png'
                  alt='WhatsApp'
                />
              </a>
              <a href='http://www.facebook.com/tortaslunaloca/'>
                <img
                  src='https://img.icons8.com/color/36/000000/facebook.png'
                  alt='Facebook'
                />
              </a>
              <a href='http://www.instagram.com/lunalocacupcakes/'>
                <img
                  src='https://img.icons8.com/cute-clipart/36/000000/instagram-new.png'
                  alt='Instagram'
                />
              </a>
              <a href='https://twitter.com/LunalocaCupcake'>
                <img
                  src='https://img.icons8.com/cute-clipart/36/000000/twitter.png'
                  alt='Twitter'
                />
              </a>
            </div>
            <div className='row'>
              <div className='col-md-4 col-sm-3'>
                <RemoteImage
                  img='v1588188060/2524a6_8d832b15ec284093bc44523f24685c4d_eqrk5l.jpg'
                  cssClass='pad-sm p-2'
                />
              </div>
              <div className='col-md-8 col-sm-9'>
                <form onSubmit={e => onSubmit(e)}>
                  <div className='form-group'>
                    <input
                      type='text'
                      className='form-control'
                      placeholder='Nombre *'
                      name='name'
                      value={name}
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
                    <small id='emailHelp' className='form-text text-muted'>
                      Nunca compartiremos tu email con nadie más.
                    </small>
                  </div>
                  <div className='form-group'>
                    <input
                      type='text'
                      className='form-control'
                      placeholder='Teléfono'
                      name='phonenumber'
                      value={phonenumber}
                      onChange={e => onChange(e)}
                    />
                  </div>
                  <div className='form-group'>
                    <input
                      type='text'
                      className='form-control'
                      placeholder='Asunto'
                      name='subject'
                      value={subject}
                      onChange={e => onChange(e)}
                    />
                  </div>
                  <div className='form-group'>
                    <textarea
                      className='form-control'
                      placeholder='Mensaje *'
                      name='message'
                      value={message}
                      onChange={e => onChange(e)}
                      required
                      rows={8}
                    />
                  </div>
                  <div className='float-right'>
                    <button type='submit' className='btn btn-highlight'>
                      Enviar
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

ContactUs.propTypes = {
  setLoadingStatus: PropTypes.func.isRequired,
};

export default connect(
  null,
  { setLoadingStatus },
)(ContactUs);
