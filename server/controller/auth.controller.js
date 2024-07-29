const { registerSchema, loginSchema } = require('../utils/zod/user.schema');
const prisma = require('../db/prisma');
const ErrorHandler = require('../utils/errorHandler');
const { hash, compare } = require('bcryptjs');
const sendToken = require('../utils/sendToken');
const { excludePassword } = require('../utils/utils');

// REGISTER
exports.registerUser = async (req, res, next) => {
  try {
    let validate = registerSchema.safeParse(req.body);
    if (!validate.success) {
      return res.status(400).json({ errors: validate.error.issues });
    }
    delete validate.data.confirmPassword;
    let hashedPassword = await hash(validate.data.password, 10);
    const newUser = await prisma.user.create({
      data: { ...validate.data, password: hashedPassword },
      select: excludePassword,
    });
    if (newUser) sendToken(newUser, req, res);
  } catch (error) {
    next(error);
  }
};

// LOGIN
exports.loginUser = async (req, res, next) => {
  try {
    let validate = loginSchema.safeParse(req.body);
    if (!validate.success) {
      return res.status(400).json({ errors: validate.error.issues });
    }
    const user = await prisma.user.findFirst({
      where: { email: validate.data.email },
    });
    if (!user) throw new ErrorHandler(403, 'Invalid Credentials!');
    let comparePassword = await compare(validate.data.password, user.password);
    if (!comparePassword) throw new ErrorHandler(403, 'Invalid Credentials!');
    sendToken(user, req, res);
  } catch (error) {
    next(error);
  }
};

// LOGOUT
exports.logoutUser = async (req, res, next) => {
  try {
    res.cookie('token', null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });
    res.status(200).json({ success: true, message: 'Logged Out' });
  } catch (error) {
    next(error);
  }
};
