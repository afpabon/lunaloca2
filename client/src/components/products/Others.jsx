import React from 'react';
import RemoteImage from '../layout/RemoteImage';

const Others = () => (
  <>
    <div className='col-md-12 bg-light p-4'>
      <h1>Otros.</h1>
      <p>
        Porque nos gusta innovar y ampliar los productos que podemos ofrecerte,
        en esta sección encontraras mas de nuestras delicias...
      </p>
      <p>Anímate a probarlas!</p>
      <div className='row'>
        <div className='col-md-4'>
          <RemoteImage
            img='v1588183158/2524a6_5ec7c6b54b5e4c0bb51227fd7e054038_uspele.jpg'
            cssClass='pad-sm'
          />
          <div className='p-4'>
            <h4>Saint Honoré.</h4>
            <p>
              Repollitas rellenas de crema pastelera saborizada con vainas de
              vainilla, selladas con ganache de chocolate, sobre una capa de
              hojaldre fresco y cubiertas de dulce y dorado caramelo,
              acompañadas de crema batida y fresas frescas...
            </p>
            <p>Se nos hace agua la boca!</p>
            <p>
              (Este increíble postre, esta disponible también en versión libre
              de azucares agregados, endulzada con splenda y miel de agave).
            </p>
          </div>
        </div>
        <div className='col-md-4'>
          <RemoteImage
            img='v1588183158/2524a6_eddcebfad02d4e71a9161bd1b83568e2_kq420a.jpg'
            cssClass='pad-sm'
          />
          <div className='p-4'>
            <h4>Macarons.</h4>
            <p className='small'>*Producto no disponible en el momento.</p>
            <p>Unas de las galletas mas deliciosas que encontraras!</p>
            <p>
              Hechas a base de merengue y harina de almendras (o pistacho si
              deseas este sabor) y con variados rellenos como: ganache de
              chocolate amargo, de leche o blanco, arequipe, nutella, crema de
              Limón o Naranja, crema de Fresa, Mora, Piña o Arándanos.
            </p>
          </div>
        </div>
        <div className='col-md-4'>
          <RemoteImage
            img='v1588183157/2524a6_2294944c20b645659819955f784ac381_h8o5vl.jpg'
            cssClass='pad-sm'
          />
          <div className='p-4'>
            <h4>Brownies.</h4>
            <p>
              Con recetas caseras y deliciosas, nuestros brownies son ideales
              para toda ocasión.
            </p>
            <p>
              Puedes pedirlos sencillos o decorados (en diversas formas o
              letras), de acuerdo a lo que necesites.
            </p>
          </div>
        </div>
      </div>
    </div>
  </>
);

export default Others;
