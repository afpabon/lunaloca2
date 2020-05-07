import React from 'react';
import { useLocation } from 'react-router-dom';

import imgCupcakes from '../../img/gallery/2524a6_979f2f9e7d6f454ab72d372d3bb926e2.jpg';
import { isAdminRoute } from '../../utils/routes';

const Footer = () => {
  const location = useLocation();
  const isAdminSection = isAdminRoute(location.pathname);

  return (
    !isAdminSection && (
      <footer className='content bg-light'>
        <div className='row'>
          <div className='col-lg-3 col-sm-6'>
            <img src={imgCupcakes} className='container-fluid' alt='Cupcake' />
          </div>
          <div className='col-lg-3 col-sm-6 box'>
            <p>
              Horario de Atención:​
              <br />
              Martes a Sábado:
              <br />
              10:00am - 6:00pm
              <br />
              <img
                src='https://img.icons8.com/office/30/000000/whatsapp.png'
                alt='WhatsApp'
              />
              <a className='dark' href='http://wa.me/3144309086'>
                +57 314 4309086
              </a>
            </p>
            <p>
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
            </p>
          </div>
          <div className='col-lg-6 col-sm-12 contact-box'>
            <div className='content'>
              <p>Suscríbete para recibir promociones y descuentos</p>
              <form>
                <div className='form-row align-items-center'>
                  <div className='col-lg-10'>
                    <input
                      type='text'
                      className='form-control mb-2'
                      placeholder='Correo electrónico'
                    />
                  </div>
                  <div className='col-lg-2'>
                    <button type='submit' className='btn btn-main mb-2'>
                      Enviar
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='col-md-6'>
            &copy; 2020 Lunaloca Cupcakes Bogot&aacute;
          </div>
          <div className='col-md-6'>
            *Los datos que ingreses aquí, son completamente confidenciales y
            serán utilizados única y exclusivamente para enviar promociones de
            Lunaloca Cupcakes Bogotá.
          </div>
        </div>
      </footer>
    )
  );
};

export default Footer;
