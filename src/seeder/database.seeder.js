const userSeed = require("./seeds/user.seed");
const courseSeed = require("./seeds/course.seed");

const seed = async () => {
  if (process.argv[2] === "--import") {
    await seedAll();
    process.exit();
  } else if (process.argv[2] === "--destroy") {
    await dropAll();
    process.exit();
  } else if (process.argv[2] === "--refresh") {
    await dropAll();
    await seedAll();
    process.exit();
  } else {
    process.exit();
  }
};

const seedAll = async () => {
  console.log("Seeding...");

  await userSeed("seed");
  await courseSeed("seed");

  console.log("Seeding complete!");
};

const dropAll = async () => {
  console.log("Dropping...");

  await userSeed("drop");
  await courseSeed("drop");

  console.log("Dropping complete!");
};

module.exports = { seed };
