const sendToken = (user, statusCode, res) => {
  // Create JWT token
  const token = user.getJwtToken();

  // Set cookie options
  const options = {
    expires: new Date(Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: true,
  };

  // Set the token value as a cookie in the response
  res.cookie('token', token, options);

  // Store token in local storage
  localStorage.setItem('token', token);

  // Send the response with the token value and user information
  res.status(statusCode).json({
    success: true,
    token,
    user,
  });
};

module.exports = sendToken;

