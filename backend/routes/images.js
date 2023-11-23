const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const db = require('../models/db');
const AWS = require('aws-sdk');
const fs = require('fs');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); 
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); 
  },
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
router.get('/see/:filename', (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, '../uploads/', filename);

  res.sendFile(filePath);
});




module.exports = router;
