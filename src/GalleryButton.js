import React from 'react';
import galleryIcon from './gallery_icon.png'; 

function GalleryButton({ onSelect }) {
  const handleGalleryClick = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (event) => {
      const file = event.target.files[0];
      if (file) {
        // TODO
      }
    };
    input.click();
  };

  return (
    <button onClick={handleGalleryClick} className="gallery-button">
      <img src={galleryIcon} alt="Gallery" />
    </button>
  );
}

export default GalleryButton;