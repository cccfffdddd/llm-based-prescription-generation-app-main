import React from 'react';
import placeholderImage from './placeholderImage.webp'; 

function ImagePlaceholder({ image }) {
  return (
    <div className="image-placeholder">
      <img src={image || placeholderImage} alt="Placeholder" />
    </div>
  );
}

export default ImagePlaceholder;
