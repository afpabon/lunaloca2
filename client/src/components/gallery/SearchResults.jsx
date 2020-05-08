import { uuid } from 'uuidv4';
import _ from 'lodash';
import Swal from 'sweetalert2';
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import RemoteImage from '../layout/RemoteImage';
import Highlighter from 'react-highlight-words';

import { setCurrentEnlargedImage } from '../../actions/carousel';

const SEARCH_IMAGE_HEIGHT = 200;

const ImageResult = ({ image, term, setCurrentEnlargedImage }) => {
  const { url, description, categories, quotable, baseid, tags } = image;
  return (
    <div className='well search-result'>
      <div className='row'>
        <div className='col-lg-4 col-md-6 col-xs-12'>
          <a
            href='#!'
            onClick={e => {
              e.preventDefault();
              setCurrentEnlargedImage(image);
            }}
          >
            <RemoteImage
              img={url}
              alt={description}
              height={SEARCH_IMAGE_HEIGHT}
              fluid={false}
            />
          </a>
        </div>
        <div className='col-lg-8 col-md-6 col-xs-12'>
          <h3>
            <Highlighter
              highlightClassName='bg-highlight'
              searchWords={[term]}
              autoEscape={true}
              textToHighlight={description}
            />
          </h3>
          <p>
            <Highlighter
              highlightClassName='bg-highlight'
              searchWords={[term]}
              autoEscape={true}
              textToHighlight={tags.join(', ')}
            />
          </p>
        </div>
      </div>
    </div>
  );
};

const SearchResults = ({ term, searchedImages, setCurrentEnlargedImage }) => (
  <div className='row'>
    <div className='col-xs-12 col-sm-12 col-md-12 col-lg-12'>
      {_.map(searchedImages, image => (
        <ImageResult
          key={uuid()}
          term={term}
          image={image}
          setCurrentEnlargedImage={setCurrentEnlargedImage}
        />
      ))}
    </div>
  </div>
);

SearchResults.propTypes = {
  term: PropTypes.string.isRequired,
  searchedImages: PropTypes.array,
  setCurrentEnlargedImage: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  term: state.carousel.searchedTerm,
  searchedImages: state.carousel.searchedImages,
});

export default connect(
  mapStateToProps,
  { setCurrentEnlargedImage },
)(SearchResults);
