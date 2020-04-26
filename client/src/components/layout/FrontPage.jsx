import React from 'react';
import imgTopLeft from '../../img/gallery/2524a6_705b2092b4b34d348ce6b0855313ae0d.jpg';
import imgBottomLeft from '../../img/gallery/2524a6_c64aba0c6e79428189cb4567f4f25a74.jpg';

const FrontPage = () => {
  return (
    <>
      <div className='col-md-12 bg-light'>
        <div className='row m-2'>
          <div className='col-lg-4 col-md-6 col-sm-12'>
            <img src={imgTopLeft} className='container-fluid' alt='Tortas' />
          </div>
          <div className='col-lg-4 col-md-6 col-sm-12'>
            <h1 className='text-highlight title-text'>
              Pastelería Por Encargo
            </h1>
            <p>
              Deliciosas tortas, cupcakes, cake pops, brownies, pies, galletas y
              mucho mas, con recetas 100% artesanales y caseras para que
              deleites tu paladar.
            </p>
            <p>Tu lo imaginas, nosotros lo horneamos!</p>
            <div className='highlighted-box'>
              <p>Informes:​</p>
              <a href='mailto:lunalocacupcakes@hotmail.com'>
                lunalocacupcakes@hotmail.com
              </a>
              <br />
              <a href='www.facebook.com/tortaslunaloca'>
                www.facebook.com/tortaslunaloca
              </a>
              <br />
              <img
                src='https://img.icons8.com/office/30/000000/whatsapp.png'
                alt='WhatsApp'
              />
              <a href='http://wa.me/3144309086'>+57 314 4309086</a>
              <p>
                (Cotizaciones únicamente por medio escrito, no mensajes ni
                llamadas de voz)
              </p>
            </div>
          </div>
          <div className='col-lg-4 col-md-6 col-sm-12 products-background'>
            <a
              href='products.html'
              className='lower-left-button btn btn-noteworthy'
            >
              PRODUCTOS
            </a>
          </div>
        </div>
        <div className='row m-2'>
          <div className='col-lg-6 col-sm-12'>
            <img
              src={imgBottomLeft}
              className='container-fluid'
              alt='Cupcakes'
            />
          </div>
          <div className='col-lg-6 col-sm-12 embed-container'>
            <iframe
              src='https://www.youtube.com/embed//ZA0CVnjY7eM'
              frameBorder='0'
              allowFullScreen
              title='Video Youtube'
            ></iframe>
          </div>
        </div>
      </div>
    </>
  );
};

export default FrontPage;
