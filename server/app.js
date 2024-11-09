// script SOLO per development
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const collectionRoutes = require('./routes/collections');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Rotte
//app.use('/api/auth', authRoutes);
app.use('/api', collectionRoutes);

app.get('/', (req, res) => {
  res.send('Hello');
});

// connessione al db
const connectWithRetry = (uri) => {
  return mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
    .then(() => {
      console.log(`Connesso a MongoDB su ${uri}`);
    })
    .catch((err) => {
      console.error(`Errore nella connessione a MongoDB su ${uri}:`, err.message);
      
      // Prova la connessione a localhost se non riesce con 'mongo'
      if (uri === 'mongodb://mongo:27017/k') {
        console.log('Tentativo di connessione a MongoDB su localhost...');
        return connectWithRetry('mongodb://localhost:27017/k');
      }

      // Se anche localhost fallisce, termina il processo con errore
      console.error('Connessione a MongoDB fallita su entrambe le URI.');
      process.exit(1);
    });
};

// Primo tentativo di connessione al servizio Docker
connectWithRetry('mongodb://mongo:27017/k');


// Avvia il server
const PORT = process.env.PORT || 5555;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
