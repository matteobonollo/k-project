const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const Collection = require("../models/Collection");
const logger = require("../logger");
const mongoose = require("mongoose");
const verifyToken = require("../utils/verifyToken");

router.post("/order", async (req, res) => {
  try {
    logger.info("inserting order");
    const { email, shippingAddress, items, total } = req.body;

    // Validazione dei dati
    if (
      !email ||
      !shippingAddress ||
      !Array.isArray(items) ||
      items.length === 0
    ) {
      return res.status(400).json({
        error: "Dati non validi. Verifica email, indirizzo e prodotti.",
      });
    }

    // Verifica che i prodotti esistano nel database e che ci sia stock sufficiente
    for (const item of items) {
      const product = await Collection.findById(item.id);
      if (!product) {
        logger.info(`Prodotto con ID ${item.id} non trovato.`);
        return res
          .status(404)
          .json({ error: `Prodotto con ID ${item.id} non trovato.` });
      }
      if (product.stock < item.quantity) {
        return res.status(400).json({
          error: `Stock insufficiente per il prodotto ${product.name}.`,
        });
      }
    }

    // Calcola il totale per sicurezza
    const calculatedTotal = parseFloat(
      items
        .reduce((acc, item) => {
          return acc + item.price * item.quantity;
        }, 0)
        .toFixed(2), // Arrotonda a 2 decimali
    );

    // Tolleranza per la comparazione di valori monetari
    const EPSILON = 0.01;

    if (Math.abs(calculatedTotal - total) > EPSILON) {
      return res
        .status(400)
        .json({ error: "Il totale calcolato non corrisponde." });
    }

    // Crea un nuovo ordine
    const newOrder = new Order({
      email,
      items: items.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      })),
      total: calculatedTotal,
      shippingAddress,
      status: "Pending",
    });

    await newOrder.save();

    // Aggiorna lo stock dei prodotti
    for (const item of items) {
      await Collection.findByIdAndUpdate(
        item.id,
        { $inc: { stock: -item.quantity } },
        { new: true },
      );
    }

    res
      .status(201)
      .json({ message: "Ordine creato con successo", order: newOrder });
  } catch (err) {
    console.error("Errore durante la creazione dell'ordine:", err);
    res.status(500).json({ error: "Errore del server" });
  }
});

router.get("/order", verifyToken, async (req, res) => {
  try {
    logger.info("Retrieving all orders");

    const userEmail = req.user.username;
    const orders = await Order.find({ email: userEmail });

    if (orders.length === 0) {
      return res.json([]);
    }

    res.json(orders);
  } catch (error) {
    console.error("Errore durante il recupero degli ordini:", error);
    res.status(500).json({ error: "Errore del server." });
  }
});

module.exports = router;
