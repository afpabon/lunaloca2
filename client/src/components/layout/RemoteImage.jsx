import React from 'react';
import { CLOUDINARY } from '../../constants/config';

const RemoteImage = ({ img, alt = '' }) => (
  <img src={`${CLOUDINARY}/${img}`} className='container-fluid' alt={alt} />
);

export default RemoteImage;
