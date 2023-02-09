const express = require('express');
const router = express.Router();

const { signup_get, login_get, signup_post, login_post, logout } = require('../controllers/authController');

router.route('/signup').get(signup_get).post(signup_post);

router.route('/login').get(login_get).post(login_post);

router.get('/logout', logout);

module.exports = router;
