import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import lunaloca from '../../img/lunaloca.png';
import Carousel from './Carousel';
import UserLogin from './UserLogin';

import { isAdminRoute } from '../../utils/routes';
import { getMainCarouselImages } from '../../actions/carousel';

const BORDER_SIZE = 30;
const NORMAL_MAX_DIMENSION = 245;

const Header = ({ getMainCarouselImages, mainCarouselImages }) => {
  useEffect(() => {
    getMainCarouselImages();
  }, [getMainCarouselImages]);

  const location = useLocation();
  const isAdminSection = isAdminRoute(location.pathname);

  const dimension = Math.floor(
    Math.min(NORMAL_MAX_DIMENSION, (window.innerWidth - BORDER_SIZE) / 2),
  );

  return (
    <>
      <header>
        <div className='col-md-3 col-xs-12 header-account'>
          <UserLogin />
        </div>
        <div className='row side-lined'>
          <img src={lunaloca} className='main-logo' alt='Lunaloca cupcakes' />
        </div>
        {!isAdminSection && (
          <div className='col-md-3 col-xs-12 header-search'>
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
        )}
      </header>
      {!isAdminSection && (
        <div className='col-md-12 tuck-under-title'>
          <Carousel
            images={mainCarouselImages}
            autoplay
            showDots={false}
            showArrows={false}
            maxHeight={dimension}
            maxWidth={dimension}
            preventResponsive={window.innerWidth < 400}
          />
        </div>
      )}
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
