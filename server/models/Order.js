const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  email: { type: String, ref: "User", required: true },
  items: [
    {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Collection",
        required: true,
      },
      name: { type: String, required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
    },
  ],
  total: { type: Number, required: true },
  shippingAddress: { type: String, required: true },
  status: {
    type: String,
    enum: ["Pending", "Shipped", "Delivered", "Cancelled"],
    default: "Pending",
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Order", orderSchema);
