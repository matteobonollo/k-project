const express = require("express");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const logger = require("../logger");
const verifyToken = require("../utils/verifyToken");
const router = express.Router();

// Registrazione
router.post("/register", async (req, res) => {
  try {
    logger.info("registering in ...");
    const { username, firstName, lastName, password } = req.body;
    const emailaddress = username;

    // Controlla se l'utente esiste già
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists." });
    }

    // Crea un nuovo utente

    const user = new User({
      username,
      emailaddress,
      firstName,
      lastName,
      password,
    });
    await user.save();
    res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    console.error("Errore durante la registrazione:", error);
    res.status(500).json({ error: "Server error. Please try again later." });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    logger.info("Attempting login...");

    const { username, password } = req.body;

    // Validazione dei dati di input
    if (!username || !password) {
      return res
        .status(400)
        .json({ error: "Username and password are required." });
    }

    // Trova l'utente nel database
    const user = await User.findOne({ username });

    if (!user) {
      logger.warn(`Login failed: User not found for username ${username}`);
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Verifica la password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      logger.warn(`Login failed: Incorrect password for username ${username}`);
      return res.status(401).json({ error: "Invalid credentials" });
    }

    logger.info(`User ${username} logged in successfully.`);

    // Genera un token JWT
    const token = jwt.sign(
      { id: user._id.toString(), username: user.emailaddress },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }, // Scadenza del token
    );

    res.json({ token, message: "Login successful" });
  } catch (error) {
    logger.error("Error during login:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/me", verifyToken, (req, res) => {
  res.json({
    message: "User is authenticated.",
    user: req.user, // Informazioni sull'utente dal token JWT
  });
});




module.exports = router;


