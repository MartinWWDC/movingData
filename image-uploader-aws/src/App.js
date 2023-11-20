import React from 'react';
import ImageForm from './components/ImageForm';
import ImageList from './components/ImageList';

const App = () => {
  return (
    <div>
      <h1>Image Uploader</h1>
      <ImageForm />
      <ImageList />
    </div>
  );
};

export default App;
