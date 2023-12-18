const { Course } = require("../models/course.model");

const getAllCourses = (filter = {}) => {
  return Course.find(filter);
};

const getOneCourse = (filter) => {
  return Course.findOne(filter);
};

const createNewCourse = (payload) => {
  const course = new Course(payload);

  return course.save();
};

const updateOneCourse = (filter, payload) => {
  return Course.findOneAndUpdate(filter, payload, { new: true });
};

const deleteOneCourse = (filter) => {
  return Course.findOneAndDelete(filter);
};

module.exports = {
  getAllCourses,
  getOneCourse,
  createNewCourse,
  updateOneCourse,
  deleteOneCourse,
};
