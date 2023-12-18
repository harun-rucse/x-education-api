const { User } = require("../../models/user.model");

module.exports = async (type) => {
  if (type === "seed") {
    await User.create({
      _id: "5f9f1b9b8b7c1c2b8c8b8b8b",
      name: "Admin",
      email: "admin@gmail.com",
      password: "password",
      role: "admin",
    });

    await User.create({
      _id: "5f9f1b9b8b7c1c2b8c8b8b8c",
      name: "User",
      email: "user@gmail.com",
      password: "password",
      role: "user",
    });
  } else if (type === "drop") {
    await User.deleteMany({});
  }
};
