import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BACKEND_URL } from '../../../config';

type Image = {
  url: string;
  alt: string;
};

interface DisplayImagesProps {
  setSelectedImage: (url: string) => void;
}

const DisplayImages: React.FC<DisplayImagesProps> = ({ setSelectedImage }) => {
  
  const [images, setImages] = useState<Image[]>([]);


  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/images`);
        setImages(response.data);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchImages();
  }, []);

  const handleImageClick = (url: string) => {
    setSelectedImage(url);
  };

  return (
    <div className='w-full bg-white mx-auto flex flex-col items-center'>
    <div className="flex justify-center items-center w-full grid grid-cols-4 gap-4">
      {images.map((image, index) => (
        <img
          key={index}
          src={image.url}
          alt={image.alt}
          className="w-20 h-20 cursor-pointer"
          onClick={() => handleImageClick(image.url)}
        />
      ))}
     
    </div>
    
    </div>
  );
};

export default DisplayImages;