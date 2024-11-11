const express = require("express");
const router = express.Router();
const Collection = require("../models/Collection");
const Favorite = require("../models/Favorite");
const User = require("../models/User");
const logger = require("../logger");
const mongoose = require("mongoose");
const verifyToken = require("../utils/verifyToken");

router.post("/favorites", verifyToken, async (req, res) => {
  const userId = req.user.id; // Dato dal middleware di autenticazione
  const { productId } = req.body;

  if (userId && productId) {
    try {
      // Controlla se esiste già un record con userId e productId
      const favorite = await Favorite.findOneAndUpdate(
        { userId, productId }, // Condizioni di ricerca
        { userId, productId }, // Valori di aggiornamento o creazione
        { upsert: true, new: true, setDefaultsOnInsert: true }, // Crea se non esiste, restituisci il nuovo documento
      );

      res.status(201).json(favorite);
    } catch (error) {
      console.error("Errore nel salvataggio dei preferiti:", error);
      res.status(500).json({ error: "Errore nel salvataggio dei preferiti" });
    }
  } else {
    res.status(400).json({ message: "userId e productId sono richiesti" });
  }
});

router.delete("/favorites/:productId", verifyToken, async (req, res) => {
  const userId = req.user.id; // Dato dal middleware di autenticazione
  const { productId } = req.params;

  try {
    await Favorite.findOneAndDelete({ userId, productId });
    res.status(200).json({ message: "Preferito rimosso" });
  } catch (error) {
    res.status(500).json({ error: "Errore nel rimuovere il preferito" });
  }
});

module.exports = router;
