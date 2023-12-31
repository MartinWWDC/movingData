const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const db = require('../models/db');
const AWS = require('aws-sdk');
const fs = require('fs');


AWS.config.update({
  accessKeyId: process.env.AccessKeyId,
  secretAccessKey: process.env.secretAccessKey,
  region: process.env.region
});

const s3 = new AWS.S3();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); 
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); 
  },
});
const upload = multer({ storage: storage });

router.get('/', async (req, res) => {
  try {
    const results = await db.query('SELECT * FROM files');
    res.json(results);
  } catch (error) {
    console.error('Error querying the database:', error);
    res.status(500).send('Error querying the database.');
  }
});
router.get('/see/:filename', (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, '../uploads/', filename);

  res.sendFile(filePath);
});

router.post('/upload', upload.single('image'), (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ message: 'Nessun file caricato.' });
    }

    const insertQuery = 'INSERT INTO files (id,commento, isLocal) VALUES (?, ?, ?)';
    const result = db.query(insertQuery, [file.filename, file.path, true]);

    res.json({ message: 'Upload completato con successo.' });
  } catch (error) {
    console.error('Errore durante l\'upload:', error);
    res.status(500).json({ message: 'Errore durante l\'upload.' });
  }
});
router.post('/moveToAWS/:filename', (req, res) => {
  const filename = req.params.filename;

  const filePath = `uploads/${filename}`;

  if (!fs.existsSync(filePath)) {
    return res.status(404).send('File non trovato nella cartella "uploads".');
  }

  const fileBuffer = fs.readFileSync(filePath);

  const params = {
    Bucket: 'bf-tino-test',
    Key: filename,
    Body: fileBuffer
  };

   s3.upload(params, (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Errore durante il caricamento su S3.');
    }

    res.send(`File caricato con successo. URL: ${data.Location}`);
  });
  
  const insertQuery = `UPDATE files SET isLocal = '0' WHERE id = ?`;
  const result = db.query(insertQuery, filename);
});


module.exports = router;
