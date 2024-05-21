const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');


const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
  secret: 'secret-key',
  resave: false,
  saveUninitialized: true
}));

app.use('/', indexRouter);
app.use('/auth', authRouter);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
