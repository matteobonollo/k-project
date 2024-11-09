const mongoose = require('mongoose');

const CollectionSchema = new mongoose.Schema({
  name: { type: String, required: true },       // Nome della collezione
  description: { type: String },                // Descrizione della collezione
  category: { type: String, required: true },   // Categoria della collezione
  items: [{                                     // Lista di elementi nella collezione
    itemName: { type: String, required: true },
    itemPrice: { type: Number, required: true },
    itemImage: { type: String }
  }],
  createdAt: { type: Date, default: Date.now }  // Data di creazione
});

module.exports = mongoose.model('Collection', CollectionSchema);
