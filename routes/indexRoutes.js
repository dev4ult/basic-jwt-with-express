const express = require('express');
const router = express.Router();
const requireAuth = require('../middleware/requireAuth');

router.get('/', requireAuth, (req, res) => {
  res.render('homepage', { title: 'Express' });
});

module.exports = router;
