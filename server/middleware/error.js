const ErrorHandler = require('../utils/errorhandler');

const errorMiddleware = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || 'Internal Server Error';

  // Wrong MongoDB ID error (CastError)
  if (err.name === 'CastError') {
    const message = `Resource not found invalid: ${err.path}`;
    err = new ErrorHandler(message, 400);
  }

  // Duplicate key error (MongoDB's 11000 error code)
  if (err.code === 11000) {
    const message = `Duplicate field value entered: ${Object.keys(err.keyValue)} entered`;
    err = new ErrorHandler(message, 400);
  }

  // Wrong JWT token error (JsonWebTokenError)
  if (err.name === 'JsonWebTokenError') {
    const message = 'Invalid Token';
    err = new ErrorHandler(message, 400);
  }

  // JWT token expired error (TokenExpiredError)
  if (err.name === 'TokenExpiredError') {
    const message = 'Token expired';
    err = new ErrorHandler(message, 400);
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });

  next(err);
};

module.exports = errorMiddleware;
