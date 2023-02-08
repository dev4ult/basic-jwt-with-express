const express = require('express');
const logger = require('morgan');
const connectDatabase = require('./config/database');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const errorHandler = require('./middleware/errorHandler');
const dotenv = require('dotenv').config();

const indexRouter = require('./routes/indexRoutes');
const usersRouter = require('./routes/usersRoutes');
const authRouter = require('./routes/authRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// view engine setup
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static('public'));

connectDatabase();

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.get('/setcookie', (req, res) => {
  res.cookie('newUser', false);

  res.send('you got the cookie');
});

app.get('/getcookie', (req, res) => {
  const cookies = req.cookies;

  res.json(cookies);
});

app.use(authRouter);

// error handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`listening to port: ${PORT}`);
});
