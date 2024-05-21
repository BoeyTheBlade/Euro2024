const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config');
const router = express.Router();

router.get('/register', (req, res) => {
  res.render('register');
});

router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword], (err) => {
    if (err) return res.status(500).send('Server error');
    res.redirect('/auth/login');
  });
});

router.get('/login', (req, res) => {
  res.render('login');
});

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  db.query('SELECT * FROM users WHERE username = ?', [username], async (err, results) => {
    if (err) return res.status(500).send('Server error');
    if (results.length === 0) return res.status(400).send('User not found');
    const user = results[0];
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).send('Incorrect password');
    const token = jwt.sign({ id: user.id }, 'secret-key', { expiresIn: '1h' });
    req.session.token = token;
    res.redirect('/dashboard');
  });
});

module.exports = router;
