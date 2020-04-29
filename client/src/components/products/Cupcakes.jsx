import React from 'react';
import RemoteImage from '../layout/RemoteImage';
import { Link } from 'react-router-dom';

const Cupcakes = () => (
  <>
    <div className='col-md-12 bg-light p-4'>
      <h1>Cupcakes.</h1>
      <p>
        Pequeños bizcochos cargados de sabor, suaves, esponjosos, dulces y
        deliciosos. Terminados con nuestra exclusiva receta de buttercream,{' '}
        <Link to='/glossary/ganache' className='dark'>
          ganache de chocolate
        </Link>{' '}
        (blanco, de leche o amargo) y/o{' '}
        <Link to='/glossary/fondant' className='dark'>
          fondant de masmelo
        </Link>{' '}
        dependiendo del diseño, en la decoración que mas te guste...
      </p>
      <p>
        Para garantizarte a ti y a todos nuestros clientes la frescura de sus
        productos, nuestras ventas de cupcakes son por medias docenas, y
        nuestras ventas de mini-cupcakes, son por docenas debido a que no nos es
        posible reducir mas la receta.
      </p>
      <div className='row'>
        <div className='col-md-4'>
          <RemoteImage
            img='v1588180328/2524a6_15b43b45822048338114c2fce995e834_iczmhu.png'
            cssClass='pad-sm'
          />
          <div className='p-4'>
            <h4>Masas Tradicionales.</h4>
            <p>
              Vainilla, Limón, Naranja, Banano, Vainilla-Chips, Red Velvet,
              Zanahoria, Coco.
            </p>
          </div>
        </div>
        <div className='col-md-4'>
          <RemoteImage
            img='v1588180354/2524a6_b4b017442b8744339d3eb74d1d32262a_gbrabh.jpg'
            cssClass='pad-sm'
          />
          <div className='p-4'>
            <h4>Masas Gourmet.</h4>
            <p>
              Chocolate, Mantequilla de maní, Zanahoria con nuez, Semillas de
              Amapola, Baileys, Pistachos, S'mores (chocolate con capacillo de
              galleta), Oreo.
            </p>
          </div>
        </div>
        <div className='col-md-4'>
          <RemoteImage
            img='v1588180392/2524a6_d1c3cce16d9c44caa3a90010a74c5fad_f08szd.jpg'
            cssClass='pad-sm'
          />
          <div className='p-4'>
            <h4>Rellenos.</h4>
            <p>
              Salsa de Caramelo, Arequipe, Nutella, Ganache de Chocolate de
              Leche o Blanco, Mermeladas de Fresa, Mora o Frutos Rojos.
            </p>
          </div>
        </div>
      </div>
    </div>
  </>
);

export default Cupcakes;
