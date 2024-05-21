const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authenticate');

router.get('/dashboard', authenticate, (req, res) => {
  res.render('dashboard');
});

module.exports = router;
