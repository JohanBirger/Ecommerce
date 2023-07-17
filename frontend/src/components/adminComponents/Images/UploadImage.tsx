// UploadImage.tsx
import React from 'react';
import axios from 'axios';
import { BACKEND_URL } from '../../../config';

const UploadImage: React.FC = () => {
  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append('image', file);

      try {
        const response = await axios.post(`${BACKEND_URL}/images/upload`, formData);
        console.log(response.data);
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  };

  return (
    <div>
      <input type="file" onChange={handleImageUpload} />
    </div>
  );
};

export default UploadImage;