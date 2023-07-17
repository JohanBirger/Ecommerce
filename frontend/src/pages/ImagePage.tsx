// frontend/src/pages/CartPage.tsx
import React from 'react';
import UploadImage from '../components/adminComponents/Images/UploadImage';
import DisplayImages from '../components/adminComponents/Images/DisplayImages';


const ImagePage: React.FC = () => {
  return (
    <div>
      <UploadImage/>
      <DisplayImages setSelectedImage={() => {}} />
    </div>
  );
};

export default ImagePage;