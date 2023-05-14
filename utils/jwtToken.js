//create and send token and save in the cookie
const sendToken = (user,statusCode,res)=>{
    
     console.log('user:', user);
    console.log('JWT_SECRET:', process.env.JWT_SECRET);
  console.log('JWT_EXPIRES_TIME:', process.env.JWT_EXPIRES_TIME);

try {
  // create JWT token
  const token = user.getJwtToken();
  console.log('Token:', token);
  // set cookie options
  const options = {
    expires: new Date(Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000),
    domain: '.onrender.com'
  };
  // set cookie in response
  res.cookie('token', token, options);
  // send response with token
  res.status(200).json({
    success: true,
    token,
    user,
  });
    console.log("token--",token,"token sent");
} catch (err) {
  console.error('Error generating JWT token:', err.message);
  next(new ErrorHandler('Internal server error', 500));
}

    

}

module.exports = sendToken;

