const asyncHandler = require('express-async-handler');
const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');

const signup_get = asyncHandler(async (req, res) => {
  res.render('signup');
});

const login_get = asyncHandler(async (req, res) => {
  res.render('login');
});

const signup_post = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.create({
      email,
      password,
    });
    const token = createToken(user._id);
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(200).json({ user: user._id });
  } catch (err) {
    if (err.code == 11000) {
      throw new Error('Email has been registered');
    }
  }
});

const login_post = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await userModel.login(email, password);
  const token = createToken(user._id);
  res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
  res.status(200).json({ user: user._id });
});

const maxAge = 3 * 24 * 60 * 60;

const createToken = (id) => {
  return jwt.sign({ id }, 'secret text', {
    expiresIn: maxAge,
  });
};

module.exports = { signup_get, login_get, signup_post, login_post };
