import React, { useState } from 'react';
import axios from 'axios';

const ImageForm = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (file) => {
    setSelectedFile(file);
  };


  const upload = async () => {
    const formData = new FormData();
    formData.append('image', selectedFile);
  
    try {
      await axios.post(process.env.REACT_APP_API_ENDPOINT+'/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Upload completato con successo.');
    } catch (error) {
      console.error('Errore durante l\'upload:', error);
    }
  };

  const moveToAWS = (imageId) => {
    // Implementa la logica per spostare l'immagine da local ad AWS
  };

  return (
    <div>
      <input type="file" onChange={(e) => handleFileChange(e.target.files[0])} />
      <button onClick={upload}>Upload</button>
    </div>
  );
};

export default ImageForm;
