const appRoot = require('app-root-path');
const winston = require('winston');
const process = require('process');
 
const { combine, timestamp, label, printf } = winston.format;
 
const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});
 
const options = 
{
  file: {
    level: 'info',
    filename: `${appRoot}/logs/winston.log`,
    handleExceptions: true,
    json: false,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false,
    format: combine(
      label({ label: 'winston-log' }),
      timestamp(),
      myFormat 
    )
  },

  console: {
    level: 'debug',
    handleExceptions: true,
    json: false,  //json formatting
    colorize: true,
    format: combine(
      label({ label: 'Rest_express' }),
      timestamp(),
      myFormat
    )
  }
}
 
let logger = new winston.createLogger({
  transports: [
    new winston.transports.File(options.file)
  ],
  exitOnError: false, 
});
 
if(process.env.NODE_ENV !== 'production'){
  logger.add(new winston.transports.Console(options.console))
}

logger.stream = {
  write: function(message, encoding) {
    logger.info(message);
  },
};
 
module.exports = logger;
