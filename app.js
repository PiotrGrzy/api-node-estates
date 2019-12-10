const express = require('express');
const morgan = require('morgan');

const estateRouter = require('./routes/estateRoutes');
const usersRouter = require('./routes/usersRoutes');
const AppError = require('./utils/appError');
const globaleErrorHandler = require('./controllers/errorController');

const app = express();

// MIDDLEWARE
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});
app.use('/api/v1/estates', estateRouter);
app.use('/api/v1/users', usersRouter);

// handling unhandled routes
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on the server!`));
});

app.use(globaleErrorHandler);

module.exports = app;
