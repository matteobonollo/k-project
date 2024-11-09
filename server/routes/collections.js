const express = require("express");
const router = express.Router();
const Collection = require("../models/Collection"); // Modello Collection
const logger = require("../logger");
const mongoose = require("mongoose");
// Endpoint per ottenere collezioni con filtri
router.get("/collections", async (req, res) => {
  try {
    logger.info("Retrieving all collections");
    // Filtri dinamici dalla query string
    const { name, category, minItems, maxItems } = req.query;

    let query = {};

    if (name) {
      query.name = { $regex: name, $options: "i" }; // Ricerca case-insensitive
    }

    if (category) {
      query.category = category; // Filtra per categoria
    }

    if (minItems) {
      query["items.0"] = { $exists: true }; // Controlla che ci siano almeno minItems
    }

    if (maxItems) {
      query["items"] = { $size: { $lte: Number(maxItems) } }; // Filtra per maxItems
    }

    const collections = await Collection.find(query);
    res.json(collections);
  } catch (error) {
    console.error("Errore nel recupero delle collezioni:", error);
    res.status(500).json({ message: "Errore server", error });
  }
});

// Endpoint per ottenere una singola collezione tramite ID
router.get("/collection/:id", async (req, res) => {
  const { id } = req.params;
  let query = {};
  query._id = id;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "ID non valido" });
    }

    const collectionItem = await Collection.findById(id);

    if (!collectionItem) {
      return res.status(404).json({ error: "Elemento non trovato" });
    }

    res.json(collectionItem);
  } catch (err) {
    console.error("Errore durante il recupero:", err);
    res.status(500).json({ error: "Errore del server" });
  }
});

module.exports = router;
