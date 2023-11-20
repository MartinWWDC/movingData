const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const db = require('../models/db');

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
router.post('/upload', upload.single('image'), async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ message: 'Nessun file caricato.' });
    }

    // Salva i dettagli del file nel database, se necessario
    const insertQuery = 'INSERT INTO files (filename, path, isLocal) VALUES (?, ?, ?)';
    const result = await db.query(insertQuery, [file.filename, file.path, true]);

    res.json({ message: 'Upload completato con successo.' });
  } catch (error) {
    console.error('Errore durante l\'upload:', error);
    res.status(500).json({ message: 'Errore durante l\'upload.' });
  }
});
router.get('/', async (req, res) => {
  try {
    const results = await db.query('SELECT * FROM files');
    res.json(results);
  } catch (error) {
    console.error('Error querying the database:', error);
    res.status(500).send('Error querying the database.');
  }
});

router.put('/:id/move-to-aws', async (req, res) => {
  const { id } = req.params;
  try {
    // Implementa la logica per spostare l'immagine da local ad AWS
    // ...

    res.json({ success: true });
  } catch (error) {
    console.error('Error moving image to AWS:', error);
    res.status(500).send('Error moving image to AWS.');
  }
});

module.exports = router;
