const express = require('express');
const dotenv = require('dotenv');
const imagesRouter = require('./routes/images');
const cors = require('cors');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cors()); // Abilita il CORS per consentire richieste da React

app.use('/api/images', imagesRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
