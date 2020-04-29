import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getGalleryLabelById } from '../../constants/enums';
import Carousel from '../layout/Carousel';

import { getCarouselImages } from '../../actions/carousel';

const Gallery = ({ getCarouselImages, carouselImages }) => {
  const { id } = useParams();

  useEffect(() => {
    getCarouselImages(id);
  }, [getCarouselImages, id]);

  const [width, setWidth] = useState(10);
  const div = useCallback(node => {
    if (node !== null) {
      setWidth(node.offsetWidth);
    }
  }, []);

  return (
    <div className='col-md-12 bg-light'>
      <h2>{getGalleryLabelById(parseInt(id))}.</h2>
      <div className='carousel-container' ref={div}>
        <Carousel
          images={carouselImages}
          lazy
          maxWidth={Math.min(Math.floor(width / 3), 300)}
          maxHeight={300}
        />
      </div>
    </div>
  );
};

Gallery.propTypes = {
  carouselImages: PropTypes.array,
  getCarouselImages: PropTypes.func.isRequired,
};

Gallery.defaultProps = {
  carouselImages: [],
};

const mapStateToProps = state => ({
  carouselImages: state.carousel.currentCarousel,
});

export default connect(
  mapStateToProps,
  { getCarouselImages },
)(Gallery);
