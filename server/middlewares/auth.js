const ErrorHandler = require('../utils/errorHandler');
const jwt = require('jsonwebtoken');
const prisma = require('../db/prisma');
const { excludePassword } = require('../utils/utils');

exports.isAuth = async (req, res, next) => {
  try {
    let token;
    let clientType = req.headers['x-client-type'];
    if (clientType == 'native-app') {
      token = req.headers['authorization']?.split(' ')[1];
    } else {
      token = req.cookies?.token;
    }
    if (!token) throw new ErrorHandler(500, 'Please log in to continue.');
    const verifyToken = jwt.verify(token, process.env.JWT_SECRET);
    let user = await prisma.user.findFirst({
      where: {
        id: verifyToken.id,
      },
      select: excludePassword,
    });
    if (!user) throw new ErrorHandler(500, 'Please log in to continue.');
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};
