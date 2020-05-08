import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useLocation, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import lunaloca from '../../img/lunaloca.png';
import Carousel from './Carousel';
import UserLogin from './UserLogin';

import { isAdminRoute } from '../../utils/routes';
import { setLoadingStatus } from '../../actions/loadingStatus';
import { getMainCarouselImages, searchImages } from '../../actions/carousel';

const BORDER_SIZE = 30;
const NORMAL_MAX_DIMENSION = 245;

const Header = ({
  getMainCarouselImages,
  searchImages,
  setLoadingStatus,
  mainCarouselImages,
}) => {
  useEffect(() => {
    getMainCarouselImages();
  }, [getMainCarouselImages]);

  const [term, setTerm] = useState('');

  const history = useHistory();
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
                onChange={e => setTerm(e.target.value)}
              />
              <div className='input-group-append'>
                <button
                  className='btn btn-sm btn-main'
                  type='button'
                  onClick={async () => {
                    if (term.length > 0) {
                      setLoadingStatus(true);
                      await searchImages(term);
                      setLoadingStatus(false);
                      history.push('/search-results');
                    }
                  }}
                >
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
  setLoadingStatus: PropTypes.func.isRequired,
  searchImages: PropTypes.func.isRequired,
};

Header.defaultProps = {
  mainCarouselImages: [],
};

const mapStateToProps = state => ({
  mainCarouselImages: state.carousel.mainCarousel,
});

export default connect(
  mapStateToProps,
  { getMainCarouselImages, searchImages, setLoadingStatus },
)(Header);
