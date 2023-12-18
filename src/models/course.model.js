const Joi = require("joi");
const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const courseSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    duration: {
      type: String,
      required: true,
    },
    level: {
      type: String,
      required: true,
    },
    topics: {
      type: [String],
      required: true,
    },
    schedule: {
      startDate: {
        type: Date,
        required: true,
      },
      endDate: {
        type: Date,
        required: true,
      },
      classDays: {
        type: [String],
        required: true,
      },
      classTime: {
        type: String,
        required: true,
      },
    },
  },
  {
    timestamps: true,
  }
);

const validateCourse = (course) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required(),
    duration: Joi.string().required(),
    level: Joi.string().required(),
    topics: Joi.array().items(Joi.string()).required(),
    schedule: Joi.object({
      startDate: Joi.date().required().label("Start Date"),
      endDate: Joi.date().required().label("End Date"),
      classDays: Joi.array().items(Joi.string()).required().label("Class Days"),
      classTime: Joi.string().required().label("Class Time"),
    }).required(),
  });

  return schema.validate(course);
};

const validateCourseUpdate = (course) => {
  const schema = Joi.object({
    name: Joi.string(),
    description: Joi.string(),
    price: Joi.number(),
    duration: Joi.string(),
    level: Joi.string(),
    topics: Joi.array().items(Joi.string()),
    schedule: Joi.object({
      startDate: Joi.date(),
      endDate: Joi.date(),
      classDays: Joi.array().items(Joi.string()),
      classTime: Joi.string(),
    }),
  });

  return schema.validate(course);
};

const Course = model("Course", courseSchema);

module.exports = { Course, validateCourse, validateCourseUpdate };
