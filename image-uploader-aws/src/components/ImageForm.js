import React, { useState } from 'react';
import axios from 'axios';

const ImageForm = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (file) => {
    setSelectedFile(file);
  };

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append('image', selectedFile);

      // Aggiungi altre informazioni al formData se necessario

      await axios.post('API_ENDPOINT/upload', formData);
      alert('Upload completato con successo!');
    } catch (error) {
      console.error('Errore durante l\'upload:', error);
      alert('Errore durante l\'upload.');
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
