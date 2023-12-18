const _ = require("lodash");
const authService = require("../services/auth.service");
const tokenService = require("../services/token.service");
const { validateUser } = require("../models/user.model");
const catchAsync = require("../utils/catch-async");
const AppError = require("../utils/app-error");

/**
 * @desc    Register new user
 * @route   POST /api/auth/register
 * @access  Public
 */
const register = catchAsync(async (req, res, next) => {
  const { error } = validateUser(req.body);
  if (error) return next(new AppError(error.details[0].message, 400));

  const payload = _.pick(req.body, ["name", "email", "password"]);
  const user = await authService.register(payload);
  const token = tokenService.generateJwtToken({ id: user._id });

  res.status(201).json(token);
});

/**
 * @desc    Login a user
 * @route   POST /api/auth/login
 * @access  Public
 */
const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError("Email and password is required.", 400));
  }

  const user = await authService.login(email, password);
  const token = tokenService.generateJwtToken({ id: user._id });

  res.status(200).json(token);
});

module.exports = { register, login };
