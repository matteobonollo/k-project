const express = require("express");
const router = express.Router();
const Collection = require("../models/Collection");
const Favorite = require("../models/Favorite");
const logger = require("../logger");
const mongoose = require("mongoose");
// Endpoint per ottenere collezioni con filtri
router.get("/collections", async (req, res) => {
  try {
    logger.info("Retrieving all collections");

    // Filtri dinamici dalla query string
    const { favorite } = req.query;

    const userData = req.headers["user-data"]
      ? JSON.parse(req.headers["user-data"])
      : null;

    let query = {};

    let collections = await Collection.find(query);

    if (favorite && userData) {
      const favorites = await Favorite.find({ userId: userData.id }).select(
        "productId",
      );

      const favoriteItems =
        favorites.length > 0
          ? favorites.map((fav) => fav.productId.toString())
          : [];

      // Seleziona solo le collezioni preferite
      const enrichedCollections =
        collections.length > 0
          ? collections.map((collection) => {
              const isFavorite = favoriteItems.includes(
                collection._id.toString(),
              );
              return { ...collection.toObject(), favorite: isFavorite };
            })
          : [];

      collections = enrichedCollections;
    }

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
