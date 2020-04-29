import React from 'react';
import RemoteImage from '../layout/RemoteImage';

const Pops = () => (
  <>
    <div className='col-md-12 bg-light p-4'>
      <h1>Pops.</h1>
      <p>
        Olvídate de platos y cubiertos y anímate a probar nuestros deliciosos
        pops. Presentados en palitos de bambú y empacados individualmente, para
        mayor higiene.
      </p>
      <div className='row'>
        <div className='col-md-4'>
          <RemoteImage
            img='v1588182756/2524a6_e3711905864f449b912d7be78932bf59_s7usm7.jpg'
            cssClass='pad-sm'
          />
          <div className='p-4'>
            <h4>Cakepops.</h4>
            <p>
              Deliciosas trufas a base de ponque, cubiertas de chocolate blanco
              o de leche y con la decoración que tu elijas.
            </p>
            <p>
              Pueden ser sencillas (con solo chispas), o temáticas, dependiendo
              de lo que necesites.
            </p>
            <p>
              (Para garantizarte a ti y a todos nuestros clientes la frescura de
              sus productos, nuestras ventas de Cakepops son por docenas debido
              a que no nos es posible reducir mas la receta).
            </p>
          </div>
        </div>
        <div className='col-md-4'>
          <RemoteImage
            img='v1588182756/2524a6_2cce75672b7a4c219ca71e28c8a6b8ba_pvavs4.jpg'
            cssClass='pad-sm'
          />
          <div className='p-4'>
            <h4>Oreo-Pops.</h4>
            <p>
              Galletas Oreo cubiertas de chocolate blanco o de leche y con la
              decoración que tu elijas.
            </p>
            <p>
              Pueden ser sencillas (con solo chispas), o temáticas, dependiendo
              de lo que necesites.
            </p>
            <p>
              En Oreo pops también podemos manejar decoración impresa 100%
              comestible.
            </p>
            <p>(Nuestras ventas en este producto son por docenas).</p>
          </div>
        </div>
        <div className='col-md-4'>
          <RemoteImage
            img='v1588182762/2524a6_86c4ea57a2e3497e94f80b71b6c68388_oipagp.png'
            cssClass='pad-sm'
          />
          <div className='p-4'>
            <h4>Cookiepops.</h4>
            <p>
              Galletas de mantequilla, o chocolate puestas en palito y con la
              decoración que escojas, a base de glasé real, chocolate, chispas
              de colores, fondant de masmelo y mucho mas...
            </p>
            <p>
              También en estas podemos manejar decoración impresa 100%
              comestible.
            </p>
            <p>
              (Para garantizarte a ti y a todos nuestros clientes la frescura de
              sus productos, nuestras ventas de Cookiepops son por veintenas
              debido a que no nos es posible reducir mas la receta).
            </p>
          </div>
        </div>
      </div>
    </div>
  </>
);

export default Pops;
