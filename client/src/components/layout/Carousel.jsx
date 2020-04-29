import React, { useState, useCallback } from 'react';
import { uuid } from 'uuidv4';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import RemoteImage from './RemoteImage';

import { setCurrentEnlargedImage } from '../../actions/carousel';

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
            <div className='overlay'>{image.description}</div>
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
};

export default connect(
  null,
  { setCurrentEnlargedImage },
)(Carousel);
