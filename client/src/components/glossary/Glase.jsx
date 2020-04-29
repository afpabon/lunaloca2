import React from 'react';
import RemoteImage from '../layout/RemoteImage';

const Glase = () => (
  <>
    <div className='col-md-12 bg-light p-4'>
      <div className='row'>
        <div className='col-md-6'>
          <h1>Glasé Real.</h1>
          <p>
            El glasé real, consiste en la mezcla de claras de huevo, azúcar
            pulverizada y jugo de limón...
          </p>
          <p>
            Puede ser teñido de cualquier color y al secar, esta mezcla se
            endurece y da un terminado mate, lo que le hace ideal para hacer
            dibujos, figuras y demás en las decoraciones de galletas.
          </p>
        </div>
        <div className='col-md-6'>
          <RemoteImage
            img='v1588184098/2524a6_a8d72f1911884b40baa2fbcbfb832ba3_psgapm.png'
            cssClass='pad-sm'
          />
        </div>
      </div>
    </div>
  </>
);

export default Glase;
