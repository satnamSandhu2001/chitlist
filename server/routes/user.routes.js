const { getMyDetails } = require('../controller/user.controller');
const { isAuth } = require('../middlewares/auth');

const router = require('express').Router();

router.route('/me').get(isAuth, getMyDetails);

module.exports = router;
