import React from 'react';
import { useLocation } from 'react-router-dom';

import imgCupcakes from '../../img/gallery/2524a6_979f2f9e7d6f454ab72d372d3bb926e2.jpg';
import { isAdminRoute } from '../../utils/routes';

const ContactFooter = () => (
  <>
    <div className='content'>
      <p>Suscríbete para recibir promociones y descuentos</p>
      <form>
        <div className='form-row align-items-center'>
          <div className='col-10'>
            <input
              type='text'
              className='form-control mb-2'
              placeholder='Correo electrónico'
            />
          </div>
          <div className='col-2'>
            <button type='submit' className='btn btn-main mb-2'>
              Enviar
            </button>
          </div>
        </div>
      </form>
      <div className='mt-4 row'>
        <div className='col-12'>
          *Los datos que ingreses aquí, son completamente confidenciales y serán
          utilizados única y exclusivamente para enviar promociones de Lunaloca
          Cupcakes Bogotá.
        </div>
      </div>
    </div>
  </>
);

const InfoFooter = () => (
  <>
    <div className='col-sm-6 col-xs-12'>
      <img src={imgCupcakes} className='container-fluid' alt='Cupcake' />
    </div>
    <div className='col-sm-6 col-xs-12 box'>
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
  </>
);

const Footer = () => {
  const location = useLocation();
  const isAdminSection = isAdminRoute(location.pathname);

  return (
    !isAdminSection && (
      <footer className='content bg-light'>
        <div className='col-sm-6 col-xs-12 contact-box'>
          <ContactFooter />
        </div>
        {window.innerWidth < 768 && <div className='clearfix' />}
        <div className='col-sm-6 col-xs-12'>
          <div className='row'>
            <InfoFooter />
          </div>
        </div>
        <div className='col-12'>
          &copy; 2020 Lunaloca Cupcakes Bogot&aacute;
        </div>
      </footer>
    )
  );
};

export default Footer;
