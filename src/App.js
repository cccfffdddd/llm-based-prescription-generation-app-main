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
  const [page2, setPage2] = useState(false);
  const navigate = useNavigate();

  // const downloadImage = () => {
  //   if (uploadedImageUrl) {
  //     const link = document.createElement('a');
  //     link.href = uploadedImageUrl;
  //     link.download = 'downloaded_image.png';
  //     document.body.appendChild(link);
  //     link.click();
  //     document.body.removeChild(link);
  //   }
  // };

  const handleImageUpload = () => {
    setTimeout(() => {
      setLoading(true);
      navigate('/loading');
      setTimeout(() => {
        setLoading(false);
        setPage2(true);
        navigate('/page2');
      }, 6000); // Navigate to page 2 after 1000 milliseconds
    }, 2000);
  };

  const downloadImage = () => {
        // Logic to download image1
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
      ) : page2 ? (<div className='page2-container'>
        <div className='image-placeholder'>
          <div className="image-container-2">
            <img src={image1} alt="Image 1" />
          </div>
        </div>
        <div className="result-container-2">
          <div className='download-button-container'>
            <button className="download-button-2" onClick={downloadImage}>
              <img src={image2} alt="Image 2" />
            </button>
          </div>
        </div>
      </div>) : uploadedImageUrl ? (
        <div className="result-container">
          <div className="image-container">
            <img src={uploadedImageUrl} alt="Result" className="result-image" />
          </div>
          <button onClick={downloadImage} className="download-button">
            <img src={downloadIcon} alt="Download" />
          </button>
        </div>
      ) : (
        <>
          <ImagePlaceholder image={image} />
          <div className="button-container">
            <label className="camera-button">
              <input
                type="file"
                accept="image/*"
                capture="environment"
                onClick={handleImageUpload}
                style={{ display: 'none' }}
              />
              <img src={cameraIcon} alt="Camera" />
            </label>
            <GalleryButton onSelect={handleSelect} />
          </div>
        </>
      )
      }
    </div>

  );
}

export default App;