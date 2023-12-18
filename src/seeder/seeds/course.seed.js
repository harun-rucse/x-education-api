const { Course } = require("../../models/course.model");

module.exports = async (type) => {
  if (type === "seed") {
    await Course.create({
      _id: "65802b42654341dfa244d912",
      name: "Introduction to Web Development",
      description: "A Comprehensive Introduction to Web Development.",
      price: 5000,
      duration: "8 weeks",
      level: "Beginner",
      topics: ["HTML", "CSS", "JavaScript", "Vue.js", "Node.js", "Express.js", "RESTful APIs"],
      schedule: {
        startDate: "2023-02-15T00:00:00.000Z",
        endDate: "2023-04-10T00:00:00.000Z",
        classDays: ["Monday", "Wednesday", "Friday"],
        classTime: "18:00 - 20:00",
      },
    });
  } else if (type === "drop") {
    await Course.deleteMany({});
  }
};
