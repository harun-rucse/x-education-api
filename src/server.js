const path = require("path");
const dotenv = require("dotenv");
dotenv.config({ path: path.resolve(`.env.${process.env.NODE_ENV}`) });

process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION! 💥 Shutting down...");
  console.log(err.name, err.message);
  process.exit(1);
});

const app = require("./app");
const database = require("./bootstrap/database");

database()
  .then(() => {
    console.log("DB connection successful!");
  })
  .catch((err) => {
    console.log("DB connection failed!");
  });

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`API is listening in [${process.env.NODE_ENV}] on port ${PORT}`);
});

process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION! 💥 Shutting down...");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
