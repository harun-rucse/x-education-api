const express = require("express");
const app = express();

require("./bootstrap/global-middleware")(app);
require("./bootstrap/routes")(app);

module.exports = app;
