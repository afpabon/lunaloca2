import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import lunaloca from '../../img/lunaloca.png';
import Carousel from './Carousel';

import { getMainCarouselImages } from '../../actions/carousel';

const Header = ({ getMainCarouselImages, mainCarouselImages }) => {
  useEffect(() => {
    getMainCarouselImages();
  }, [getMainCarouselImages]);
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
      <div className='col-md-12 tuck-under-title'>
        <Carousel
          images={mainCarouselImages}
          lazy
          autoplay
          showDots={false}
          showArrows={false}
          maxHeight={245}
          maxWidth={245}
        />
      </div>
    </>
  );
};

Header.propTypes = {
  mainCarouselImages: PropTypes.array,
  getMainCarouselImages: PropTypes.func.isRequired,
};

Header.defaultProps = {
  mainCarouselImages: [],
};

const mapStateToProps = state => ({
  mainCarouselImages: state.carousel.mainCarousel,
});

export default connect(
  mapStateToProps,
  { getMainCarouselImages },
)(Header);
