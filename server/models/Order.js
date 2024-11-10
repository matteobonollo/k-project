const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  email: { type: String, ref: "User", required: true }, // Email associata all'ordine
  items: [
    {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Collection",
        required: true,
      }, // Riferimento alla collezione prodotti
      name: { type: String, required: true }, // Nome del prodotto
      quantity: { type: Number, required: true }, // Quantità ordinata
      price: { type: Number, required: true }, // Prezzo per unità
    },
  ],
  total: { type: Number, required: true }, // Totale dell'ordine
  shippingAddress: { type: String, required: true }, // Indirizzo di spedizione
  status: {
    type: String,
    enum: ["Pending", "Shipped", "Delivered", "Cancelled"], // Stati possibili per l'ordine
    default: "Pending",
  },
  createdAt: { type: Date, default: Date.now }, // Data di creazione dell'ordine
  updatedAt: { type: Date, default: Date.now }, // Data di aggiornamento dell'ordine
});

module.exports = mongoose.model("Order", orderSchema);
