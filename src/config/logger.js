const winston = require("winston");

const transport = new winston.transports.File({
  name: "basic-log",
  filename: ".logs/info.log",
  datePattern: "YYYY-MM-DD",
  zippedArchive: true,
  colorize: false,
  maxFiles: "2d",
});

const logFormat = winston.format.combine(
  winston.format.colorize(),
  winston.format.timestamp(),
  winston.format.align(),
  winston.format.printf((info) => `${info.timestamp}:${info.message}`)
);

const logger = winston.createLogger({
  format: logFormat,
  transports: [transport],
});

module.exports = logger;
