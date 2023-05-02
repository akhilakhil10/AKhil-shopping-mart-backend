const sendToken = (user, statusCode, req, res) => {
  // Create JWT token
  const token = user.getJwtToken();

  // Set cookie options
  const options = {
    expires: new Date(Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: req.secure || req.headers['x-forwarded-proto'] === 'https',
  };

  // Set the token value as a cookie in the response
  res.cookie('token', token, options);
  
  localStorage.setItem('token', token);

  // Send the response with the token value and user information
  res.status(statusCode).json({
    success: true,
    token,
    user,
  });
};

module.exports = sendToken;
