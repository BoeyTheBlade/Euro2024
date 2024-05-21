const mysql = require('mysql');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'Admin',
  password: 'admin1234',
  database: 'euro2024'
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to the database');
});

module.exports = db;