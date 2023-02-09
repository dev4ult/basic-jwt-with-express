const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, process.env.TEMP_TEXT_JWT, async (err, payload) => {
      if (err) return res.redirect('/login');
      const user = await userModel.findById(payload.id);
      res.locals.user = user ? user : null;
      next();
    });
  } else {
    res.redirect('/login');
  }
};

module.exports = requireAuth;
