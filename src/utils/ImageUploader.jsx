import React, { useState, useRef } from 'react';

const ImageUploader = ({ onImageChange }) => {
  const fileInputRef = useRef(null);

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onImageChange(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <img
        src="path_to_your_image.jpg" // Замените на путь к вашей изначальной картинке
        alt="Click to upload"
        style={{ cursor: 'pointer', maxWidth: '100%' }}
        onClick={handleImageClick}
      />
      <input
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        ref={fileInputRef}
        onChange={handleImageChange}
      />
    </div>
  );
};

export default ImageUploader;
