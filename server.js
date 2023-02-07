const express = require('express');
const logger = require('morgan');
const asyncHandler = require('express-async-handler');
const connectDatabase = require('./config/database');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const bodyParser = require('body-parser');
const errorHandler = require('./middleware/errorHandler');
const dotenv = require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// view engine setup
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));

connectDatabase();

app.use('/', indexRouter);
app.use('/users', usersRouter);

// error handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`listening to port: ${PORT}`);
});
