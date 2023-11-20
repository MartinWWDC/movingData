import React, { useEffect, useState } from 'react';
import axios from 'axios';
import moveToAWS from './ImageForm';

const ImageList = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get('API_ENDPOINT/images');
        setImages(response.data);
      } catch (error) {
        console.error('Errore durante il recupero delle immagini:', error);
      }
    };

    fetchImages();
  }, []);

  return (
    <div>
      <h2>Immagine Locali</h2>
      {images
        .filter((image) => image.isLocal)
        .map((image) => (
          <div key={image.id}>
            <img src={`${process.env.REACT_APP_LOCAL_URL}/${image.filename}`} alt="Local" />
            <button onClick={() => moveToAWS(image.id)}>Move to AWS</button>
          </div>
        ))}
      <h2>Immagine AWS</h2>
      {images
        .filter((image) => !image.isLocal)
        .map((image) => (
          <div key={image.id}>
            <img src={`${process.env.REACT_APP_AWS_URL}/${image.filename}`} alt="AWS" />
          </div>
        ))}
    </div>
  );
};

export default ImageList;
