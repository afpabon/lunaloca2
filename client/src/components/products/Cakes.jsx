import React from 'react';
import RemoteImage from '../layout/RemoteImage';
import { Link } from 'react-router-dom';

const Cakes = () => (
  <>
    <div className='col-md-12 bg-light p-4'>
      <h1>Tortas.</h1>
      <p>
        Queremos traerte recetas tradicionales, caseras y deliciosas, terminadas
        con la mejor opción de cubiertas, según lo que desees. Trabajamos con
        decoraciones a base de buttercream,{' '}
        <Link to='/glossary/ganache' className='dark'>
          ganache de chocolate
        </Link>{' '}
        (blanco, de leche o amargo) y/o{' '}
        <Link to='/glossary/fondant' className='dark'>
          fondant de masmelo
        </Link>{' '}
        , e impresiones en papel y tintas 100% comestibles.
      </p>
      <p>
        Todos nuestros trabajos son personalizados, así que no dudes en
        contarnos como quieres tu torta y nosotros nos encargamos de hacerla
        realidad.
      </p>
      <div className='row'>
        <div className='col-md-4'>
          <RemoteImage
            img='v1588181097/2524a6_fa57fae085c84c4388f5d3c1da4280e2_mv2_d_2711_2711_s_4_2_tncfuf.jpg'
            cssClass='pad-sm'
          />
          <div className='p-4'>
            <h4>Masas Tradicionales.</h4>
            <p>Vainilla, Limón, Naranja, Red Velvet, Zanahoria, Coco.</p>
          </div>
        </div>
        <div className='col-md-4'>
          <RemoteImage
            img='v1588181104/2524a6_29ec27fc704e4259b65fdd2bea7f3fb0_mv2_d_2956_2956_s_4_2_vn0re6.png'
            cssClass='pad-sm'
          />
          <div className='p-4'>
            <h4>Masas Gourmet.</h4>
            <p>
              Chocolate, Semillas de Amapola, Baileys, Pistachos, Oreo,
              Zanahoria con Nueces.
            </p>
          </div>
        </div>
        <div className='col-md-4'>
          <RemoteImage
            img='v1588181098/2524a6_3b1ef15e0ae64fddbd4ec9c7e7634928_mv2_bhtwsx.png'
            cssClass='pad-sm'
          />
          <div className='p-4'>
            <h4>Rellenos.</h4>
            <p>
              Arequipe, Nutella, Salsa de Caramelo, Mermelada de Fresa,
              Mermelada de Mora, Mermelada de Frutos Rojos.
            </p>
          </div>
        </div>
      </div>
    </div>
  </>
);

export default Cakes;
