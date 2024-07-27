const jwt = require('jsonwebtoken');

function sendToken(user, req, res) {
  delete user.password;

  let token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRE,
    }
  );

  let clientType = req.headers?.['x-client-type'];
  console.log(
    '<<========= user-agent ==========>>>',
    req.headers?.['user-agent']
  );

  // send token as response for mobile app
  if (clientType === 'Native-App') {
    return res.status(201).json({ user, token });
  } else {
    // set cookie for browsers
    return res
      .status(201)
      .cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      })
      .json({
        success: true,
        user,
        token,
      });
  }
}

module.exports = sendToken;
