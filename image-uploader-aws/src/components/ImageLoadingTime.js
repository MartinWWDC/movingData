import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import Papa from 'papaparse';

const ImageLoadingTime = ({ imageId }) => {
  const [image1LoadTime, setImage1LoadTime] = useState(null);
  const [image2LoadTime, setImage2LoadTime] = useState(null);

  const measureImageLoadTime = (imageUrl, setImageLoadTime) => {
    const startTime = performance.now();

    const img = new Image();
    img.onload = () => {
      const endTime = performance.now();
      const loadTime = endTime - startTime;
      setImageLoadTime(loadTime);
    };

    img.src = imageUrl;
  };

  const handleLoadButtonClick = async () => {
    // Carica l'immagine 1 e misura il tempo di caricamento
    const imageUrl1 = process.env.REACT_APP_API_ENDPOINT + '/api/images/see/' + imageId;
    measureImageLoadTime(imageUrl1, setImage1LoadTime);

    // Carica l'immagine 2 e misura il tempo di caricamento
    const imageUrl2 = process.env.REACT_APP_AWS_URL + '/' + imageId;
    measureImageLoadTime(imageUrl2, setImage2LoadTime);

    // Aggiorna il file CSV sul server con i nuovi dati
    await updateCsvOnServer();
  };

  const updateCsvOnServer = async () => {
    const csvData = {
      imageId,
      image1LoadTime,
      image2LoadTime,
      timestamp: new Date().toISOString(),
    };
  
    try {
      // Invia i dati al server per aggiornare il file CSV
      const response = await Axios.post('http://localhost:3001/update-csv', { data: csvData });
  
      if (response.data.success) {
        console.log('File CSV aggiornato con successo sul server.');
      } else {
        console.error('Errore durante l\'aggiornamento del file CSV:', response.data.error);
      }
    } catch (error) {
      console.error('Errore durante l\'aggiornamento del file CSV:', error);
    }
  };
  
  return (
    <div>
      <button onClick={handleLoadButtonClick}>Carica Pagina</button>
      <p>Tempo di caricamento dell'immagine 1: {image1LoadTime} millisecondi</p>
      <p>Tempo di caricamento dell'immagine 2: {image2LoadTime} millisecondi</p>
    </div>
  );
};

export default ImageLoadingTime;
