const { createLogger, format, transports } = require("winston");

const logger = createLogger({
  level: "info", // Livello minimo di log (es. info, warn, error)
  format: format.combine(
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    format.printf(({ timestamp, level, message }) => {
      return `${timestamp} [${level.toUpperCase()}]: ${message}`;
    }),
  ),
  transports: [
    new transports.Console(), // Log in console
    new transports.File({ filename: "logs/app.log" }), // Log in file
  ],
});

module.exports = logger;
