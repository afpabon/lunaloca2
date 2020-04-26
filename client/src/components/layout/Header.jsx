import React from 'react';
import lunaloca from '../../img/lunaloca.png';

const Header = () => {
  return (
    <>
      <header>
        <div className='side-lined'>
          <img src={lunaloca} className='main-logo' alt='Lunaloca cupcakes' />
        </div>
        <div className='col-md-2 header-search'>
          <div className='input-group mb-3'>
            <input
              className='form-control form-control-sm'
              type='text'
              placeholder='Buscar en el sitio'
              aria-label='Search'
            />
            <div className='input-group-append'>
              <button className='btn btn-sm btn-main' type='button'>
                <i className='fas fa-search' />
              </button>
            </div>
          </div>
        </div>
      </header>
      <div
        className='col-md-12 tuck-under-title'
        style={{
          height: '245px',
          backgroundColor: 'red',
        }}
      ></div>
    </>
  );
};

export default Header;
