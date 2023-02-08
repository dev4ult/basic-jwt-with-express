const asyncHandler = require('express-async-handler');
const userModel = require('../models/userModel');

const signup_get = asyncHandler(async (req, res) => {
  res.render('signup');
});

const login_get = asyncHandler(async (req, res) => {
  res.render('login');
});

const signup_post = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.create({
    email,
    password,
  });
  res.status(201).json(user);
});

const login_post = asyncHandler(async (req, res) => {
  res.render('login');
});

module.exports = { signup_get, login_get, signup_post, login_post };
