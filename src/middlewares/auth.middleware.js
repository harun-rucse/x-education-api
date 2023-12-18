const userService = require("../services/user.service");
const tokenService = require("../services/token.service");
const AppError = require("../utils/app-error");
const catchAsync = require("../utils/catch-async");

const auth = catchAsync(async (req, res, next) => {
  // Getting token and check of it's there
  let token;
  if (req.headers.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(new AppError("You are not logged in! Please log in to get access.", 401));
  }

  // Verification token
  const decoded = await tokenService.verifyJwtToken(token);

  // Check if user still exists
  const currentUser = await userService.getOneUser({ _id: decoded.id });
  if (!currentUser) {
    return next(new AppError("The user belonging to this token does no longer exist.", 401));
  }

  // ACCESS TO PROTECTED ROUTE
  req.user = currentUser;

  next();
});

const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new AppError("You do not have permission to perform this action", 403));
    }

    next();
  };
};

module.exports = { auth, restrictTo };
