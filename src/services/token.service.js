const { promisify } = require("util");
const jwt = require("jsonwebtoken");

const generateJwtToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
};

const verifyJwtToken = (token) => {
  return promisify(jwt.verify)(token, process.env.JWT_SECRET);
};

module.exports = { generateJwtToken, verifyJwtToken };
