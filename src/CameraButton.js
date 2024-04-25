// import React from 'react';
// import cameraIcon from './camera_icon.png'; 

// function CameraButton({ onCapture }) {
//   const handleCapture = async (event) => {
//     const file = event.target.files[0];
//     if (file) {

//       const imageUrl = URL.createObjectURL(file);


//       const formData = new FormData();
//       formData.append('image', file);

//       try {

//         const response = await fetch('your-upload-url', {
//           method: 'POST',
//           body: formData,

//         });

//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }

//         const result = await response.json(); 
//         onCapture(result.imageUrl); 

//       } catch (error) {
//         console.error('Error sending the image', error);

//       }
//     }
//   };

//   return (
//     <label className="camera-button">
//       <input
//         type="file"
//         accept="image/*"
//         capture="environment"
//         onChange={handleCapture}
//         style={{ display: 'none' }}
//       />
//       <img src={cameraIcon} alt="Camera" />
//     </label>
//   );
// }

// export default CameraButton;
