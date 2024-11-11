// script SOLO per development
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const logger = require("./logger");
const cors = require("cors");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/auth");
const collectionRoutes = require("./routes/collections");
const orderRoutes = require("./routes/orders");
const favoriteRoutes = require("./routes/favorites");
const app = express();
const jwt = require("jsonwebtoken");

const DB_HOST = process.env.DB_HOST || "localhost";
const MONGO_URI = `mongodb://${DB_HOST}:27017/k`;
const HOST = process.env.HOST;

// Middleware
app.use(cors());
app.use(bodyParser.json());
const authenticateAllRequests = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Estrae il token da "Bearer <token>"

  if (!token) {
    req.isAuthenticated = false; // Utente non autenticato
  } else {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded; // Informazioni utente decodificate
      req.isAuthenticated = true; // Utente autenticato
    } catch (error) {
      req.isAuthenticated = false; // Token non valido o scaduto
    }
  }

  next();
};
//app.use(authenticateAllRequests);

// Rotte
app.use("/api", favoriteRoutes);
app.use("/api/auth", authRoutes);
app.use("/api", collectionRoutes);
app.use("/api", orderRoutes);


app.use((req, res) => {
  if (req.isAuthenticated) {
    res.json({ message: "Accesso autenticato", user: req.user });
  } else {
    res.status(401).json({ error: "Accesso non autorizzato" });
  }
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
  console.log(`Server running on ${HOST}:${PORT}`);
});
