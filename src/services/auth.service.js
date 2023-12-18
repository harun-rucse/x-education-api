const AppError = require("../utils/app-error");
const userService = require("./user.service");

const register = async (payload) => {
  const isExists = await userService.getOneUser({ email: payload.email });
  if (isExists) {
    throw new AppError("Email is already exists.", 400);
  }

  const user = await userService.createNewUser(payload);

  return user;
};

const login = async (email, password) => {
  const user = await userService.getOneUser({ email, role: "admin" }).select("+password");

  const isMatch = await user?.correctPassword(password, user.password);

  if (!isMatch) {
    throw new AppError("Incorrect email or password.", 401);
  }

  return user;
};

module.exports = { register, login };
