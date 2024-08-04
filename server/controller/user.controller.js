const { updateDetailsSchema } = require('../utils/zod/user.schema');
const prisma = require('../db/prisma');

exports.getMyDetails = async (req, res, next) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    next(error);
  }
};

exports.updateMyDetails = async (req, res, next) => {
  try {
    let validate = updateDetailsSchema.safeParse(req.body);
    if (!validate.success) {
      return res.status(400).json({ errors: validate.error.issues });
    }
    await prisma.user.update({
      where: { email: req.user.email },
      data: validate.data,
    });
    res.status(200).json({
      message: 'Your details have been updated',
      logout: validate.data.email !== req.user.email,
    });
  } catch (error) {
    next(error);
  }
};
