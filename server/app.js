// script SOLO per development
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const logger = require("./logger");
const cors = require("cors");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/auth");
const collectionRoutes = require("./routes/collections");
const app = express();

const DB_HOST = process.env.DB_HOST || "localhost";
const MONGO_URI = `mongodb://${DB_HOST}:27017/k`;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Rotte
//app.use('/api/auth', authRoutes);
app.use("/api", collectionRoutes);

app.get("/", (req, res) => {
  res.send("Hello");
});

// connessione al db
const connect = (uri) => {
  return mongoose
    .connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log(`Connesso a MongoDB su ${uri}`);
    })
    .catch((err) => {
      console.error(
        `Errore nella connessione a MongoDB su ${uri}:`,
        err.message,
      );
      process.exit(1);
    });
};

// Primo tentativo di connessione al servizio Docker
connect(MONGO_URI);

// Avvia il server
const PORT = process.env.PORT || 5555;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
