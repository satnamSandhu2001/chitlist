const router = require('express').Router();
const {
  registerUser,
  loginUser,
  logoutUser,
} = require('../controller/auth.controller');

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/logout').get(logoutUser);

module.exports = router;
