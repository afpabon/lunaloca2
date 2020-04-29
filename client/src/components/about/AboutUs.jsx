import React from 'react';
import RemoteImage from '../layout/RemoteImage';

const AboutUs = () => (
  <>
    <div className='col-md-12 bg-light'>
      <div className='row m-2 bordered-container'>
        <h1 className='underlined-title'>Acerca de Nosotros.</h1>
        <div className='row'>
          <div className='col-md-6'>
            <div className='highlighted-box'>
              <p>
                Lunaloca Cupcakes Bogotá es una empresa conformada por madre (la
                Luna) e hija (la Loca), nacida gracias a nuestro amor por los
                postres.
              </p>
              ​
              <p>
                Queremos traerte deliciosas tortas, cupcakes, cakepops, pies,
                galletas y mucho mas, utilizando siempre los mejores
                ingredientes y recetas caseras con un sabor inigualable.
              </p>
              ​
              <p>
                Nuestras decoraciones son 100% comestibles (a menos que el
                cliente desee otra cosa) por lo que toman mas tiempo y trabajo
                que cartones y plásticos que puedes ver en las pastelerías
                comunes. Es por esto que debes agendar tus pedidos con entre 8 a
                20 días de anticipación a la fecha en que deseas que se haga la
                entrega (todo depende de las cantidades, y dificultad de las
                decoraciones), para poder garantizarte la mejor calidad,
                frescura y presentación.
              </p>
              ​
              <p>
                Son ideales para darte un dulce gusto, regalar, o para fiestas,
                cumpleaños, bautizos, baby showers, primeras comuniones,
                matrimonios y eventos...
              </p>
            </div>
          </div>
          <div className='col-md-6'>
            <RemoteImage
              img='v1588184588/2524a6_e7bc644a3c2e42a5a2f2253fd454b1a3_x1jqcg.png'
              cssClass='pad-sm p-2'
            />
          </div>
        </div>
        <div className='row'>
          <RemoteImage
            img='v1588184688/2524a6_5d8983b16c76400fae0efec7476dfc02_swwa17.jpg'
            cssClass='pad-sm p-2'
          />
        </div>
      </div>
    </div>
  </>
);

export default AboutUs;
