import React from 'react';
import RemoteImage from '../layout/RemoteImage';

const FirstStep = ({}) => {
  return (
    <div>
      <div>
        <h3 className='text-center'>¿Quieres comprar este producto?</h3>
        <div className='row'>
          <div className='col-6'>
            <RemoteImage img={url} alt={name} />
          </div>
          <div className='col-6'></div>
        </div>

        <label>First Name</label>
        <input
          type='text'
          className='form-control'
          name='firstname'
          placeholder='First Name'
          onChange={update}
        />
      </div>
    </div>
  );
};

export default FirstStep;
