import Swal from 'sweetalert2';
import React, { useState, useCallback } from 'react';
import { uuid } from 'uuidv4';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import RemoteImage from './RemoteImage';

import {
  setCurrentEnlargedImage,
  triggerEditImage,
  setRemovingImage,
  deleteImage,
} from '../../actions/carousel';
import { setLoadingStatus } from '../../actions/loadingStatus';

const generateResponsive = (settings, maxWidth, imageWidth, scrollDelta) => {
  if (maxWidth < imageWidth) return null;
  else {
    const slides = Math.floor(maxWidth / imageWidth);
    const current = [
      {
        breakPoint: maxWidth,
        settings: {
          ...settings,
          slidesToShow: slides,
          slidesToScroll: Math.min(slides, scrollDelta),
        },
      },
    ];
    const remaining = generateResponsive(
      settings,
      imageWidth * (slides - 1),
      imageWidth,
      scrollDelta,
    );
    if (remaining) return current.concat(remaining);
    else return current;
  }
};

const Carousel = ({
  lazy,
  images,
  singleSlide,
  scrollDelta,
  autoplay,
  autoplaySpeed,
  fade,
  cssEase,
  showDots,
  showArrows,
  maxWidth,
  maxHeight,
  setCurrentEnlargedImage,
  isAdmin,
  triggerEditImage,
  deleteImage,
  setRemovingImage,
  setLoadingStatus,
  category,
}) => {
  const [width, setWidth] = useState(1);
  const div = useCallback(node => {
    if (node !== null) {
      setWidth(node.offsetWidth);
    }
  }, []);

  let slidesToShow = 1;
  let slidesToScroll = 1;

  if (!singleSlide) {
    slidesToShow = Math.floor(width / maxWidth);
    slidesToScroll = Math.min(Math.floor(width / maxWidth), scrollDelta);
  }

  const settings = {
    infinite: true,
    dots: showDots,
    arrows: showArrows,
    slidesToShow,
    slidesToScroll,
    autoplay,
    fade: fade && singleSlide,
    adaptiveHeight: true,
  };

  const removeRequested = image => {
    setRemovingImage(true);
    Swal.fire({
      title: '¿Estás segur@?',
      text: '¡La imagen será eliminada de la base de datos y de cloudinary!',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'No, ¡mejor no!',
      confirmButtonText: 'Sí, ¡estoy segur@!',
    }).then(async isConfirm => {
      if (isConfirm) {
        setLoadingStatus(true);
        await deleteImage(image);
        setRemovingImage(false);
        setLoadingStatus(false);
      } else {
        Swal('Cancelado', 'La imagen no ha sido eliminada', 'error');
        setRemovingImage(false);
      }
    });
  };

  if (lazy) {
    settings.lazyLoad = 'ondemand';
  }

  if (autoplay) {
    settings.autoplaySpeed = autoplaySpeed;
  }

  if (fade) {
    settings.cssEase = cssEase;
    settings.speed = 500;
  }

  if (!singleSlide) {
    settings.responsive = generateResponsive(
      settings,
      maxWidth * (slidesToShow - 1),
      maxWidth,
      scrollDelta,
    );
  }

  return (
    <div ref={div}>
      {isAdmin && (
        <div className='row'>
          <a
            href='#!'
            onClick={() => triggerEditImage(null, category)}
            title='agregar'
            style={{ marginLeft: '1em' }}
          >
            <i className='fas fa-images' />
            Agregar
          </a>
        </div>
      )}
      <Slider {...settings}>
        {images.map(image => (
          <div
            key={uuid()}
            className='image carousel-item'
            onClick={e => {
              e.preventDefault();
              setCurrentEnlargedImage(image);
            }}
          >
            <RemoteImage
              img={image.url}
              alt={image.description}
              height={maxHeight}
              width={maxWidth}
              fluid={false}
            />
            <div className='overlay' style={{ width: maxWidth }}>
              {isAdmin && (
                <>
                  <div className='row float-right'>
                    <a
                      href='#!'
                      onClick={e => {
                        e.preventDefault();
                        triggerEditImage(image._id);
                      }}
                      title='editar'
                    >
                      <i className='fas fa-edit' />
                      Editar
                    </a>
                    <a
                      href='#!'
                      onClick={e => {
                        e.preventDefault();
                        removeRequested(image._id);
                      }}
                      title='eliminar'
                      style={{ marginLeft: '1em' }}
                    >
                      <i className='fas fa-trash-alt' />
                      Eliminar
                    </a>
                  </div>
                </>
              )}
              <div className='row float-left'>{image.description}</div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

Carousel.propTypes = {
  lazy: PropTypes.bool,
  images: PropTypes.array.isRequired,
  singleSlide: PropTypes.bool,
  scrollDelta: PropTypes.number,
  autoplay: PropTypes.bool,
  autoplaySpeed: PropTypes.number,
  fade: PropTypes.bool,
  cssEase: PropTypes.string,
  showDots: PropTypes.bool,
  showArrows: PropTypes.bool,
  maxWidth: PropTypes.number,
  maxHeight: PropTypes.number,
  setCurrentEnlargedImage: PropTypes.func.isRequired,
  isAdmin: PropTypes.bool.isRequired,
  triggerEditImage: PropTypes.func.isRequired,
  deleteImage: PropTypes.func.isRequired,
  setRemovingImage: PropTypes.func.isRequired,
  setLoadingStatus: PropTypes.func.isRequired,
  category: PropTypes.number,
};

Carousel.defaultProps = {
  lazy: false,
  singleSlide: false,
  scrollDelta: Number.MAX_SAFE_INTEGER,
  autoplay: false,
  autoplaySpeed: 2000,
  fade: true,
  cssEase: 'linear',
  showDots: true,
  showArrows: true,
  maxWidth: 600,
  maxHeight: null,
  category: null,
};

const mapStateToProps = state => ({
  isAdmin: state.auth.user ? state.auth.user.is_admin : false,
});

export default connect(
  mapStateToProps,
  {
    setCurrentEnlargedImage,
    triggerEditImage,
    setRemovingImage,
    deleteImage,
    setLoadingStatus,
  },
)(Carousel);
