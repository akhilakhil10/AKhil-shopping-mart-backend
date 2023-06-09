const catchAsyncErrors = require('./catchAsyncErrors');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const ErrorHandler = require('../utils/errorHandler')



exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    // Skip authentication middleware if Authorization header is not present
    return next();
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    return next(new ErrorHandler('Login first to access this resource.', 401));
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await User.findById(decoded.id);
  next();
});

//Handling user roles
exports.authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(
            new ErrorHandler(`Role(${req.user.role}) is not allowed to perform this`, 403))
        }
        next();
    }
}
