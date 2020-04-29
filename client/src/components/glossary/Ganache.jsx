import React from 'react';
import RemoteImage from '../layout/RemoteImage';

const Ganache = () => (
  <>
    <div className='col-md-12 bg-light p-4'>
      <div className='row'>
        <div className='col-md-6'>
          <h1>Ganache de Chocolate.</h1>
          <p>
            El ganache es una crema compuesta por chocolate y un líquido, en
            decir una mezcla de materia grasa y agua. Por regla general, el
            líquido suele ser crema de leche, pero también podemos usar otros
            elementos como pulpa de fruta, leche de vaca, leche de soja, licores
            o zumos.
          </p>
          <p>
            El ganache de chocolate es perfecto como relleno de tortas, como
            relleno de bombones y como cobertura de cupcakes.
          </p>
        </div>
        <div className='col-md-6'>
          <RemoteImage
            img='v1588184089/2524a6_8f04b63f435c4d0cb3499a5f9d1f4cd1_i6k03r.jpg'
            cssClass='pad-sm'
          />
        </div>
      </div>
    </div>
  </>
);

export default Ganache;
