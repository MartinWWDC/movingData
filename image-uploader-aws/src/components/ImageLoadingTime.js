import React, { useState, useEffect } from 'react';

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

  const handleLoadButtonClick = () => {
    // Carica l'immagine 1 e misura il tempo di caricamento
    const imageUrl1 = process.env.REACT_APP_API_ENDPOINT+'/api/images/see/'+imageId;
    console.log(imageUrl1);
    measureImageLoadTime(imageUrl1, setImage1LoadTime);

    // Carica l'immagine 2 e misura il tempo di caricamento
    const imageUrl2 = process.env.REACT_APP_AWS_URL+'/'+imageId;
    console.log(imageUrl2)
    measureImageLoadTime(imageUrl2, setImage2LoadTime);
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
