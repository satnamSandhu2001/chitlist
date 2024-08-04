const {
  getMyDetails,
  updateMyDetails,
} = require('../controller/user.controller');
const { isAuth } = require('../middlewares/auth');

const router = require('express').Router();

router.route('/me').get(isAuth, getMyDetails);
router.route('/update').post(isAuth, updateMyDetails);

module.exports = router;
