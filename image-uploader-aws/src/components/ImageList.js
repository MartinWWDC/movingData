import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ImageList = () => {
  const [images, setImages] = useState([]);
  const [, setIsLoading] = useState(false);

  const moveToAWS = async (id) => {
    console.log(id)
    try {
      setIsLoading(true);
      console.log(id)
      var route=process.env.REACT_APP_API_ENDPOINT+'/api/images/moveToAWS/'+id
      console.log(route)
      const response = await axios.post(route);

      console.log('Risposta dal backend:', response.data);

      window.location.reload();
    } catch (error) {
      console.error('Errore durante la richiesta moveToAWS:', error);
    } finally {
      setIsLoading(false);
    }
  };


  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get(process.env.REACT_APP_API_ENDPOINT+'/api/images');
        setImages(response.data);
      } catch (error) {
        console.error('Errore durante il recupero delle immagini:', error);
      }
    };

    fetchImages();
  }, []);

  return (
    <div>
      <h2>Immagine Locali {process.env.REACT_APP_API_ENDPOINT}</h2>
      {images
        .filter((image) => image.isLocal)
        .map((image) => (
          <div key={image.id}>
            <img src={`${process.env.REACT_APP_API_ENDPOINT}/api/images/see/${image.id}`} alt="Local" />
            <button onClick={() => moveToAWS(image.id)}>Move to AWS</button>
          </div>
        ))}
      <h2>Immagine AWS</h2>
      {images
        .filter((image) => !image.isLocal)
        .map((image) => (
          <div key={image.id}>
            
            <img src={`${process.env.REACT_APP_AWS_URL}/${image.id}`} alt="AWS" />
          </div>
        ))}
    </div>
  );
};

export default ImageList;
