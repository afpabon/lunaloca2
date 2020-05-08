import React from 'react';
import { connect } from 'react-redux';
import RemoteImage from '../layout/RemoteImage';
import NavigationButtons from './NavigationButtons';

const FirstStep = ({ photoInfo, stepWizard }) =>
  photoInfo && (
    <div className='quotation-container'>
      <div>
        <h3 className='text-center'>¿Te interesa este producto?</h3>
        <div className='row'>
          <div className='col-md-6 col-xs-12 text-center'>
            <RemoteImage
              img={photoInfo.url}
              alt={photoInfo.description}
              height={200}
            />
            <h4>{photoInfo.description}</h4>
          </div>
          <div className='col-md-6 col-xs-12'>
            <p>Podemos ayudarte a estimar el costo de lo que necesitas.</p>
            <p>
              Siguiendo estos pasos puedes cotizar tu producto, tal como lo
              requieres. Al terminar este proceso nos habrás brindado toda la
              información que necesitamos para ponernos en contacto contigo y
              cuadrar la entrega
            </p>
            <NavigationButtons stepWizard={stepWizard} />
          </div>
        </div>
      </div>
    </div>
  );

const mapStateToProps = state => ({
  photoInfo: state.quotation.photoInfo,
});

export default connect(mapStateToProps)(FirstStep);
