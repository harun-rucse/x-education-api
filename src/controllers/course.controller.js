const _ = require("lodash");
const { validateCourse, validateCourseUpdate } = require("../models/course.model");
const courseService = require("../services/course.service");
const catchAsync = require("../utils/catch-async");
const AppError = require("../utils/app-error");

/**
 * @desc    Get all courses
 * @route   GET /api/courses
 * @access  Public
 */
const getAllCourses = catchAsync(async (req, res, next) => {
  const allCourses = await courseService.getAllCourses();

  res.status(200).json(allCourses);
});

/**
 * @desc    Get single course
 * @route   GET /api/courses/id
 * @access  Public
 */
const getOneCourse = catchAsync(async (req, res, next) => {
  const course = await courseService.getOneCourse({ _id: req.params.id });
  if (!course) return next(new AppError("No course found with this id.", 404));

  res.status(200).json(course);
});

/**
 * @desc    Create new course
 * @route   POST /api/courses
 * @access  Private(admin)
 */
const createNewCourse = catchAsync(async (req, res, next) => {
  const { error } = validateCourse(req.body);
  if (error) return next(new AppError(error.details[0].message, 400));

  const payload = _.pick(req.body, ["name", "description", "price", "duration", "level", "topics", "schedule"]);
  const newCourse = await courseService.createNewCourse(payload);

  res.status(201).json(newCourse);
});

/**
 * @desc    Update single course
 * @route   PATCH /api/courses/id
 * @access  Private(admin)
 */
const updateOneCourse = catchAsync(async (req, res, next) => {
  const { error } = validateCourseUpdate(req.body);
  if (error) return next(new AppError(error.details[0].message, 400));

  const payload = _.pick(req.body, ["name", "description", "price", "duration", "level", "topics", "schedule"]);
  const updateCourse = await courseService.updateOneCourse({ _id: req.params.id }, payload);
  if (!updateCourse) return next(new AppError("No course found with this id.", 404));

  res.status(200).json(updateCourse);
});

/**
 * @desc    Delete single course
 * @route   DELETE /api/courses/id
 * @access  Private(admin)
 */
const deleteOneCourse = catchAsync(async (req, res, next) => {
  const deleteCourse = await courseService.deleteOneCourse({ _id: req.params.id });
  if (!deleteCourse) return next(new AppError("No course found with this id.", 404));

  res.status(204).send();
});

module.exports = {
  getAllCourses,
  getOneCourse,
  createNewCourse,
  updateOneCourse,
  deleteOneCourse,
};
