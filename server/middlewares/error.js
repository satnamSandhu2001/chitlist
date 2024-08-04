const ErrorHandler = require('../utils/errorHandler');

module.exports = (err, req, res, next) => {
  console.error(
    '\n<<<========================== ERROR =========================>>>'
  );
  console.log(err);
  console.error(
    '<<<========================== END =========================>>>\n'
  );

  err.statusCode = err.statusCode || 500;
  err.message = err.message || 'Internal Server Error';

  // Invalid JWT token
  if (err.name === 'JsonWebTokenError') {
    err = new ErrorHandler(401, 'Invalid Authentication Token! Please Login');
  }

  // JWT Expired Token
  if (err.name === 'TokenExpiredError') {
    err = new ErrorHandler(401, 'Session Expired! Please Login again');
  }

  // Prisma Unique constraint error
  if (err.code === 'P2002') {
    switch (err.meta.modelName) {
      case 'User': // email
        err = new ErrorHandler(
          409,
          'An account with this email address already exists. Please use a different email address or log in with your existing account.'
        );
        break;

      default:
        err = new ErrorHandler(409, 'Resource already available');
        break;
    }
  }

  // Default handler for unhandled errors
  if (!(err instanceof ErrorHandler)) {
    console.log('↗️=====UNHANDLED ERROR=====↖️');
    err = new ErrorHandler(500, 'Internal server error');
  }

  res.status(err.statusCode).json(err.message);
};
