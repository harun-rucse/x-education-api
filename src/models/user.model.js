const Joi = require("joi");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);

// Pre save hook that hash the password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Return true if password is correct, otherwise return false
userSchema.methods.correctPassword = async function (candidatePassword, userPassword) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const validateUser = (user) => {
  const schema = Joi.object({
    name: Joi.string().required().label("Name"),
    email: Joi.string().required().label("Email"),
    password: Joi.string().min(4).max(20).required().label("Password"),
  });

  return schema.validate(user);
};

const validateUserUpdate = (user) => {
  const schema = Joi.object({
    name: Joi.string().label("Name"),
    email: Joi.string().label("Email"),
    password: Joi.string().min(4).max(20).label("Password"),
    role: Joi.string().valid("user", "admin").label("Role"),
  });

  return schema.validate(user);
};

const User = model("User", userSchema);

module.exports = { User, validateUser, validateUserUpdate };
