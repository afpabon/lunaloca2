import React from 'react';
import RemoteImage from '../layout/RemoteImage';
import { Link } from 'react-router-dom';

const Cookies = () => (
  <>
    <div className='col-md-12 bg-light p-4'>
      <h1>Galletas.</h1>
      <p>
        Deliciosas, crujientes y frescas galletas, completamente libres de
        preservativos y decoradas como gustes con{' '}
        <Link to='/glossary/glase' className='dark'>
          glasé real
        </Link>
        , chocolate, chispas de colores, fondant de masmelo y mucho mas...
      </p>
      <div className='row'>
        <div className='col-md-4'>
          <RemoteImage
            img='v1588181627/2524a6_af1087794aee46848803ebbde2a7e1cf_md7xwc.jpg'
            cssClass='pad-sm'
          />
          <div className='p-4'>
            <h4>Spritz.</h4>
            <p>Tostadas, suaves, ligeras, deliciosas...</p>
            <p>
              Galletas hechas con prensa, lo que garantiza un tostado parejo y
              unas galletas con muy bonitas formas.
            </p>
            <p>
              En sabores como: Clásicas (Mantequilla y Almendra), Chocolate,
              Coco, Limón, Naranja, Semillas de Amapola, Mantequilla de Maní,
              Pistacho, o si prefieres un snack salado y delicioso, prueba
              nuestro delicioso sabor a Queso Cheddar.
            </p>
            ​<p>(Nuestras ventas en este tipo de galletas son por libras).</p>
          </div>
        </div>
        <div className='col-md-4'>
          <RemoteImage
            img='v1588181628/2524a6_241390a67dcd4d5397d6f178381ffa90_bjvn4b.jpg'
            cssClass='pad-sm'
          />
          <div className='p-4'>
            <h4>Las ideales para decorar.</h4>
            <p>
              Las mejor opción que podemos ofrecerte en galletas, si deseas una
              decoración temática, son las de mantequilla, o chocolate.
            </p>
            <p>
              Esto es gracias a que mantienen su forma perfectamente después de
              ser cortadas y horneadas, por lo que podemos trabajar
              tranquilamente en la decoración que escojas, a base de{' '}
              <Link to='/glossary/glase' className='dark'>
                glasé real
              </Link>{' '}
              <Link to='/glossary/fondant' className='dark'>
                fondant de masmelo
              </Link>
              , o impresiones 100% comestibles (nuestras ventas en este tipo de
              galletas son por veintenas).
            </p>
          </div>
        </div>
        <div className='col-md-4'>
          <RemoteImage
            img='v1588181628/2524a6_b596f6ec22614489bd725a1b00cfd5fa_bhjafy.jpg'
            cssClass='pad-sm'
          />
          <div className='p-4'>
            <h4>Más caseras.</h4>
            <p>Caseras y deliciosas!</p>
            <p>
              Estas delicias, que se deshacen en tu boca, son fresas,
              crujientes, tostaditas y vienen en multiples sabores tales como:
              Avena, Chips, Chocolate, m&m's, Canela, Mantequilla de Maní,
              Limón...
            </p>
            <p>
              (Nuestras ventas en este tipo de galletas son por veintenas en
              cada sabor por las recetas mínimas).
            </p>
          </div>
        </div>
      </div>
    </div>
  </>
);

export default Cookies;
