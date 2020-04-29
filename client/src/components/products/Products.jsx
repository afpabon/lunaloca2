import React from 'react';
import RemoteImage from '../layout/RemoteImage';
import { Link } from 'react-router-dom';

const Products = () => (
  <>
    <div className='col-md-12 bg-light'>
      <div className='row m-2 bordered-container'>
        <h1 className='underlined-title'>Productos</h1>
        <div className='highlighted-box force-left'>
          <p>
            Queremos complacer todos tus antojos... Es por eso que trabajamos
            con una variedad de productos, enfocándonos siempre en llevarte la
            mejor calidad, con recetas 100% caseras.
          </p>
          <p>Anímate a probar nuestros delicias, no te arrepentirás!</p>
        </div>
        <div class='row m-2'>
          <div class='col-md-6 col-sm-12 pad-sm'>
            <RemoteImage
              img='v1588177144/2524a6_82c5d6fc310e4f958fc1cafffcd35038_n2gjj3.jpg'
              cssClass='pad-sm'
            />
            <RemoteImage
              img='v1588177347/2524a6_112962364a4a486f8cfd3e889ccf3ecc_v7lnjk.jpg'
              cssClass='pad-sm p-2'
            />
          </div>
          <div class='col-md-6 col-sm-12 pad-sm'>
            <div className='highlighted2-box'>
              <div className='row m-2'>
                <div className='col-md-6 pad-sm'>
                  <Link
                    to='/products/cupcakes'
                    className='w-100 p-3 btn btn-noteworthy'
                  >
                    <h4>Cupcakes</h4>
                  </Link>
                </div>
                <div className='col-md-6 pad-sm'>
                  <Link
                    to='/products/cakes'
                    className='w-100 p-3 btn btn-noteworthy'
                  >
                    <h4>Tortas</h4>
                  </Link>
                </div>
              </div>
              <div className='row m-2'>
                <div className='col-md-6 pad-sm'>
                  <Link
                    to='/products/cookies'
                    className='w-100 p-3 btn btn-noteworthy'
                  >
                    <h4>Galletas</h4>
                  </Link>
                </div>
                <div className='col-md-6 pad-sm'>
                  <Link
                    to='/products/pies'
                    className='w-100 p-3 btn btn-noteworthy'
                  >
                    <h4>Pies</h4>
                  </Link>
                </div>
              </div>
              <div className='row m-2'>
                <div className='col-md-6 pad-sm'>
                  <Link
                    to='/products/pops'
                    className='w-100 p-3 btn btn-noteworthy'
                  >
                    <h4>Pops</h4>
                  </Link>
                </div>
                <div className='col-md-6 pad-sm'>
                  <Link
                    to='/products/others'
                    className='w-100 p-3 btn btn-noteworthy'
                  >
                    <h4>Otros</h4>
                  </Link>
                </div>
              </div>
            </div>
            <RemoteImage
              img='v1588178794/2524a6_622e94995d084ce3a79f864557168f7a_xeim02.jpg'
              cssClass='pad-sm p-2'
            />
          </div>
        </div>
      </div>
    </div>
  </>
);

export default Products;
