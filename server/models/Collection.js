const mongoose = require("mongoose");

const CollectionSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Nome della collezione
  description: { type: String }, // Descrizione della collezione
  category: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String }, // Categoria della collezione
  createdAt: { type: Date, default: Date.now }, // Data di creazione
});

module.exports = mongoose.model("Collection", CollectionSchema);
