import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CameraButton from './CameraButton';
import GalleryButton from './GalleryButton';
import MenuButton from './MenuButton';
import ImagePlaceholder from './ImagePlaceholder';
import loadingImage from './unicorn-hug.gif';
import downloadIcon from './download-icon.webp';
import cameraIcon from './camera_icon.png';
import image1 from './placeholderImage.webp';
import image2 from './download-icon.webp';
import './App.css';

function App() {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploadedImageUrl, setUploadedImageUrl] = useState(null);
  const [download, setDownload] = useState(false);
  const navigate = useNavigate();

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (!file) {
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    setLoading(true);
    fetch('http://localhost:5000/upload', {
      method: 'POST',
      body: formData,
    })
    .then(response => response.json())
    .then(data => {
      setUploadedImageUrl(data.imageUrl);
      setLoading(false);
      setDownload(true); // Move to page 2 after successful image upload and response
      navigate('/download');
    })
    .catch(error => {
      console.error('Error:', error);
      setLoading(false);
    });
  };

  const downloadImage = () => {
    const link = document.createElement('a');
    link.href = image1;
    link.download = 'image1.jpg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSelect = (newImage) => {
    setImage(newImage);
  };

  const handleMenuClick = () => {
    console.log('Menu clicked');
  };

  return (
    <div className="App">
      <header className="App-header">
        <MenuButton onClick={handleMenuClick} />
        Welcoming
      </header>
      {loading ? (
        <div className="loading-container">
          <img src={loadingImage} alt="Loading" />
        </div>
      ) : download ? (
        <div className='page2-container'>
          <div className='image-placeholder'>
            <div className="image-container-2">
              <img src={uploadedImageUrl || image1} alt="Image 1" />
            </div>
          </div>
          <div className="result-container-2">
            <div className='download-button-container'>
              <button className="download-button-2" onClick={downloadImage}>
                <img src={image2} alt="Image 2" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <>
          <ImagePlaceholder image={image} />
          <div className="button-container">
            <label className="camera-button">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                style={{ display: 'none' }}
              />
              <img src={cameraIcon} alt="Camera" />
            </label>
            <GalleryButton onSelect={handleSelect} />
          </div>
        </>
      )}
    </div>
  );
}

export default App;
