const express = require('express');
const router = express.Router();
const Collection = require('../models/Collection'); // Modello Collection

// Endpoint per ottenere collezioni con filtri
router.get('/collections', async (req, res) => {
  try {
    // Filtri dinamici dalla query string
    const { name, category, minItems, maxItems } = req.query;

    let query = {};

    if (name) {
      query.name = { $regex: name, $options: 'i' }; // Ricerca case-insensitive
    }

    if (category) {
      query.category = category; // Filtra per categoria
    }

    if (minItems) {
      query['items.0'] = { $exists: true }; // Controlla che ci siano almeno minItems
    }

    if (maxItems) {
      query['items'] = { $size: { $lte: Number(maxItems) } }; // Controlla che ci siano meno di maxItems
    }

    const collections = await Collection.find(query);
    res.json(collections);
  } catch (error) {
    console.error('Errore nel recupero delle collezioni:', error);
    res.status(500).json({ message: 'Errore server', error });
  }
});

module.exports = router;
