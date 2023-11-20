const express = require('express');
const router = express.Router();
const db = require('../models/db');

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
