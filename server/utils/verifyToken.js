const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "Accesso negato. Token mancante." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Aggiungi i dati utente al `req`
    next();
  } catch (error) {
    res.status(401).json({ error: "Token non valido o scaduto." });
  }
}

module.exports = verifyToken;
