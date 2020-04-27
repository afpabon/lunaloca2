import React from 'react';
import { useParams } from 'react-router-dom';
import { GALLERY_GROUP } from '../../constants/enums';

const Gallery = () => {
  const { id } = useParams();
  return <div>{`Gallery ${id}`}</div>;
};

export default Gallery;
