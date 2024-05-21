const jwt = require('jsonwebtoken');

function authenticate(req, res, next) {
  const token = req.session.token;
  if (!token) return res.redirect('/auth/login');
  jwt.verify(token, 'secret-key', (err, decoded) => {
    if (err) return res.redirect('/auth/login');
    req.user = decoded;
    next();
  });
}

module.exports = authenticate;
