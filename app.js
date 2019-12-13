const express = require("express");
const morgan = require("morgan");

const estateRouter = require("./routes/estateRoutes");
const usersRouter = require("./routes/usersRoutes");
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");

const app = express();

// MIDDLEWARE
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

const allowCrossDomain = function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
};

app.use(allowCrossDomain);
app.use(express.json());
app.use(express.static("uploads"));

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});
app.use("/api/v1/estates", estateRouter);
app.use("/api/v1/users", usersRouter);
// app.use("/", (req, res) =>
//   res.status(200).json({
//     status: "success",
//     data: "Welcome in estates api"
//   })
// );

// handling unhandled routes
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on the server!`));
});

app.use(globalErrorHandler);

module.exports = app;
