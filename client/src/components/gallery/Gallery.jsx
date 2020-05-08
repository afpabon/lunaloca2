import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getGalleryLabelById } from '../../constants/enums';
import Carousel from '../layout/Carousel';

import { getCarouselImages, setCurrentCategory } from '../../actions/carousel';

const SMALL_BORDER_SIZE = 60;
const BORDER_SIZE = 100;
const NORMAL_MAX_DIMENSION = 300;
const MAX_VERTICAL_WIDTH = 368;

const Gallery = ({ getCarouselImages, setCurrentCategory, carouselImages }) => {
  const { id } = useParams();

  useEffect(() => {
    getCarouselImages(parseInt(id));
    setCurrentCategory(parseInt(id));
  }, [getCarouselImages, setCurrentCategory, id]);

  const [dimension, setDimension] = useState(10);
  const [vertical, setVertical] = useState(false);

  const div = useCallback(node => {
    if (node !== null) {
      if (node.offsetWidth < MAX_VERTICAL_WIDTH) {
        setDimension(Math.floor(node.offsetWidth - SMALL_BORDER_SIZE));
        setVertical(true);
      } else {
        setDimension(
          Math.floor(
            Math.min(
              NORMAL_MAX_DIMENSION,
              (node.offsetWidth - BORDER_SIZE) / 2,
            ),
          ),
        );
      }
    }
  }, []);

  return (
    <div className='col-md-12 bg-light'>
      <h2>{getGalleryLabelById(parseInt(id))}.</h2>
      <div className='carousel-container' ref={div}>
        <Carousel
          images={carouselImages}
          lazy
          maxWidth={dimension}
          maxHeight={dimension}
          category={parseInt(id)}
          showDots={!vertical}
        />
      </div>
    </div>
  );
};

Gallery.propTypes = {
  carouselImages: PropTypes.array,
  getCarouselImages: PropTypes.func.isRequired,
  setCurrentCategory: PropTypes.func.isRequired,
};

Gallery.defaultProps = {
  carouselImages: [],
};

const mapStateToProps = state => ({
  carouselImages: state.carousel.currentCarousel,
});

export default connect(
  mapStateToProps,
  { getCarouselImages, setCurrentCategory },
)(Gallery);
