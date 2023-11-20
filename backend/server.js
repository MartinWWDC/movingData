const express = require('express');
const dotenv = require('dotenv');
const imagesRouter = require('./routes/images');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());

// Configurazione di Multer per gestire l'upload dei file
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Specifica la cartella di destinazione per i file caricati
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Genera un nome univoco per il file
  },
});

const upload = multer({ storage: storage });

// Endpoint per l'upload di un singolo file
app.post('/api/upload', upload.single('image'), (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ message: 'Nessun file caricato.' });
    }

    // Salva i dettagli del file nel database, se necessario

    res.json({ message: 'Upload completato con successo.' });
  } catch (error) {
    console.error('Errore durante l\'upload:', error);
    res.status(500).json({ message: 'Errore durante l\'upload.' });
  }
});

app.use('/api/images', imagesRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
