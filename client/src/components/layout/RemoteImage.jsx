import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { CLOUDINARY } from '../../constants/config';

const RemoteImage = ({
  img,
  alt = '',
  width,
  height,
  fluid = true,
  cssClass,
}) => {
  const transformations = [];
  if (width) transformations.push(`w_${width}`);
  if (height) transformations.push(`h_${height}`);

  let src = '';
  if (transformations.length) {
    src = `${CLOUDINARY}/${transformations.join(',')},c_fill/${img}`;
  } else src = `${CLOUDINARY}/${img}`;

  let className = fluid ? 'container-fluid' : '';
  if (cssClass) className = `${cssClass} ${className}`;

  return (
    <LazyLoadImage
      alt={alt}
      className={className}
      src={src}
      height={height}
      width={width}
    />
  );
};

export default RemoteImage;
