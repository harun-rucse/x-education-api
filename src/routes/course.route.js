const express = require("express");
const courseController = require("../controllers/course.controller");
const { auth, restrictTo } = require("../middlewares/auth.middleware");

const router = express.Router();

router
  .route("/")
  .get(courseController.getAllCourses)
  .post([auth, restrictTo("admin")], courseController.createNewCourse);

router
  .route("/:id")
  .get(courseController.getOneCourse)
  .patch([auth, restrictTo("admin")], courseController.updateOneCourse)
  .delete([auth, restrictTo("admin")], courseController.deleteOneCourse);

module.exports = router;
