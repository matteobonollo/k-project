const jwt = require("jsonwebtoken");
const User = require("../models/User");

async function verifyToken(req, res, next) {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "Accesso negato. Token mancante." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Trova l'utente usando l'email decodificata dal token
    const user = await User.findOne({ emailaddress: decoded.username }); // Supponiamo che il token contenga 'emailaddress'
    if (!user) {
      return res.status(404).json({ error: "Utente non trovato." });
    }

    
    req.user = {
      ...decoded,
      id: user._id.toString(),
      firstName: user.firstName,
      lastName: user.lastName,
    };

    next();
  } catch (error) {
    res.status(401).json({ error: "Token non valido o scaduto." });
  }
}

module.exports = verifyToken;
