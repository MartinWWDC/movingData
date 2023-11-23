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
  accessKeyId: process.env.AccessKeyId,
  secretAccessKey: process.env.secretAccessKey,
  region: process.env.region
});

const s3 = new AWS.S3();

app.use(express.json());
app.use(cors());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); 
  },
});

const upload = multer({ storage: storage });



app.use('/api/images', imagesRouter);

app.post('/moveToAWS/:filename', (req, res) => {
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

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
