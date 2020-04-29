import React from 'react';
import RemoteImage from '../layout/RemoteImage';

const Fondant = () => (
  <>
    <div className='col-md-12 bg-light p-4'>
      <div className='row'>
        <div className='col-md-6'>
          <h1>Fondant de Masmelo.</h1>
          <p>
            El Fondant es, en repostería general, una pasta parecida a la
            plastilina pero comestible, empleada como recubrimiento de ciertas
            preparaciones como tortas, pasteles, cupcakes, etc. En la mayoría de
            los casos el fondant es una decoración repostera.
          </p>
          <p>
            La denominación fondant (que en francés significa: que se funde)
            hace referencia a la característica física del recubrimiento: que se
            funda en la boca. La forma más simple de fondant es agua y azúcar y
            es ampliamente usada en la elaboración de caramelos.
          </p>
          <p>
            El Fondant de Masmelo de Lunaloca Cupcakes Bogotá, se caracteriza
            por ser menos dulce que el Fondant tradicional, por lo que la
            mayoría de nuestros clientes disfrutan mucho comiéndolo, en vez de
            dejarlo a un lado como suelen hacer con las decoraciones
            tradicionales...
          </p>
        </div>
        <div className='col-md-6'>
          <RemoteImage
            img='v1588184089/2524a6_7687f61baca847428c340975c1256cb1_ctnmcu.jpg'
            cssClass='pad-sm'
          />
        </div>
      </div>
    </div>
  </>
);

export default Fondant;
