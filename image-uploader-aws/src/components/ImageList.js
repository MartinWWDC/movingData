import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ImageLoadingTime from './ImageLoadingTime';

const ImageList = () => {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const moveToAWS = async (id) => {
    console.log(id)
    try {
      setIsLoading(true);
      console.log(id)
      // Esegui una richiesta al tuo backend per ottenere l'indirizzo
      console.log(process.env.REACT_APP_API_ENDPOINT+'/moveToAWS/'+id)
      const response = await axios.post(process.env.REACT_APP_API_ENDPOINT+'/moveToAWS/'+id);

      // Puoi fare qualcosa con la risposta se necessario
      console.log('Risposta dal backend:', response.data);

      // Ricarica la pagina dopo aver ottenuto l'indirizzo
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
  const [showImagePage, setShowImagePage] = useState(false);
  const handleShowImagePage = () => {
    setShowImagePage(true);
  };
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
            <button onClick={handleShowImagePage}>Carica Pagina Immagini</button>
            {showImagePage && <ImageLoadingTime imageId={image.id}/>}
          </div>
        ))}
    </div>
  );
};

export default ImageList;
