import React from 'react';
import RemoteImage from '../layout/RemoteImage';

const Pies = () => (
  <>
    <div className='col-md-12 bg-light p-4'>
      <h1>Pies.</h1>
      <p>
        Deliciosos y con recetas 100% caseras, tanto en la corteza como el
        relleno, para deleitar el paladar de grandes y chicos, en sabores como:
        Manzana, Limón, Auyama, Fresa, Mora, Pera, Durazno.
      </p>
      <div className='row'>
        <div className='col-md-4'>
          <RemoteImage
            img='v1588182473/2524a6_57d1aaa1a8ba4d0e8735aa13fa8b8595_kfr5jn.jpg'
            cssClass='pad-sm'
          />
          <div className='p-4'>
            <h4>Pies Tradicionales.</h4>
            <p>
              Deliciosos Pies, con corteza casera, crujiente y dorada,
              acompañados de un fresco y delicioso relleno, preparado
              exclusivamente para tu pedido.
            </p>
            <p>Vienen en presentaciones de 8 y 10 porciones.</p>
          </div>
        </div>
        <div className='col-md-4'>
          <RemoteImage
            img='v1588182473/2524a6_102a36fa64c74a1aa60bade9da1fbb7b_k9kqwa.jpg'
            cssClass='pad-sm'
          />
          <div className='p-4'>
            <h4>Mini-Pies.</h4>
            <p>
              Evita los platos, cubiertos y demás, con nuestros pies en
              porciones personales, hechos como todo en Lunaloca, con recetas
              caseras y deliciosas.
            </p>
            <p>
              (Para garantizarte a ti y a todos nuestros clientes la frescura de
              sus productos, nuestras ventas de Mini-Pies son por medias docenas
              debido a que no nos es posible reducir mas la receta).
            </p>
          </div>
        </div>
        <div className='col-md-4'>
          <RemoteImage
            img='v1588182473/2524a6_b0f73c8837e0468c87f6602c26380175_jni0zr.jpg'
            cssClass='pad-sm'
          />
          <div className='p-4'>
            <h4>Pie Pops.</h4>
            <p>
              Los favoritos de los peques, por su facilidad de comer, hermosa
              presentación y deliciosos sabores.
            </p>
            <p>
              (Para garantizarte a ti y a todos nuestros clientes la frescura de
              sus productos, nuestras ventas de Pie Pops son por docenas debido
              a que no nos es posible reducir mas la receta).
            </p>
          </div>
        </div>
      </div>
    </div>
  </>
);

export default Pies;
