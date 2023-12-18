const path = require("path");
const dotenv = require("dotenv");
dotenv.config({ path: path.resolve(`.env.${process.env.NODE_ENV}`) });

const database = require("../bootstrap/database");
const databaseSeeder = require("./database.seeder");

database().then(() => {
  console.log("DB connection successful!");
  console.log(`---Seeding to ${process.env.NODE_ENV} database---`);
  databaseSeeder.seed();
});
