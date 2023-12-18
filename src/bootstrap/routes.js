const authRouter = require("../routes/auth.router");
const courseRouter = require("../routes/course.route");
const globalErrorHandler = require("../controllers/error.controller");
const AppError = require("../utils/app-error");

module.exports = (app) => {
  app.use("/api/auth", authRouter);
  app.use("/api/course", courseRouter);

  app.all("*", (req, res, next) => {
    next(new AppError(`Can't find ${req.method} ${req.originalUrl} on this server.`, 404));
  });

  app.use(globalErrorHandler);
};
