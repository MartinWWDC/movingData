const express = require('express');
const dotenv = require('dotenv');
const imagesRouter = require('./routes/images');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const db = require('./models/db');
const AWS = require('aws-sdk');
const fs = require('fs');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

AWS.config.update({
  accessKeyId: 'AKIASJ65SASOKPWP7GVP',
  secretAccessKey: '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',
  region: 'eu-central-1'
});

const s3 = new AWS.S3();

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
    const insertQuery = 'INSERT INTO files (id,commento, isLocal) VALUES (?, ?, ?)';
    const result = db.query(insertQuery, [file.filename, file.path, true]);

    res.json({ message: 'Upload completato con successo.' });
  } catch (error) {
    console.error('Errore durante l\'upload:', error);
    res.status(500).json({ message: 'Errore durante l\'upload.' });
  }
});

app.use('/api/images', imagesRouter);

app.post('/moveToAWS/:filename', (req, res) => {
  const filename = req.params.filename;

  // Verifica che il file esista nella cartella "uploads"
  const filePath = `uploads/${filename}`;

  if (!fs.existsSync(filePath)) {
    return res.status(404).send('File non trovato nella cartella "uploads".');
  }

  // Leggi il file dalla cartella "uploads"
  const fileBuffer = fs.readFileSync(filePath);

  // Crea un oggetto di parametri per il caricamento su S3
  const params = {
    Bucket: 'bf-tino-test',
    Key: filename,
    Body: fileBuffer
  };

  // Carica il file su S3
   s3.upload(params, (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Errore durante il caricamento su S3.');
    }

    // Se il caricamento è riuscito, restituisci l'URL del file su S3
    res.send(`File caricato con successo. URL: ${data.Location}`);
  });
  
  // Salva i dettagli del file nel database, se necessario
  const insertQuery = `UPDATE files SET isLocal = '0' WHERE id = ?`;
  const result = db.query(insertQuery, filename);
});

app.post('/update-csv', (req, res) => {
  // Ricevi i nuovi dati CSV dal client e aggiorna il file CSV sul server
  const newData = req.body.data;
  csvFilePath=process.env.csvFile
  // Leggi i dati CSV esistenti
  const existingData = fs.readFileSync(csvFilePath, 'utf-8');
  const { imageId, image1LoadTime, image2LoadTime, timestamp } = newData;

  // Unisci i nuovi dati con quelli esistenti
  const updatedData = existingData + '\n' + image1LoadTime+';'+image2LoadTime;

  // Scrivi i dati aggiornati nel file CSV
  fs.writeFileSync(csvFilePath, updatedData);

  res.json({ success: true });
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
