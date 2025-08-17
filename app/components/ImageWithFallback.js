'use client';

import { useState } from 'react';

const ImageWithFallback = ({ 
  src, 
  alt, 
  className, 
  fallbackSrc, 
  placeholder = null 
}) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (fallbackSrc && !hasError) {
      setImgSrc(fallbackSrc);
      setHasError(true);
    }
  };

  if (!src && placeholder) {
    return placeholder;
  }

  return (
    <img 
      src={imgSrc}
      alt={alt}
      className={className}
      onError={handleError}
    />
  );
};

export default ImageWithFallback;