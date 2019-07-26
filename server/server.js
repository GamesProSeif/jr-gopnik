const express = require('express');
const favicon = require('serve-favicon');
const path = require('path');
const app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'favicon.png')));

// EJS Middleware
app.set('views', path.join(__dirname, 'views/'));
app.set('view engine', 'ejs');

// Body Parser Middleware
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false
  })
);

app.get('/', (req, res) => {
  res.send('Welcome to the server');
});

app.use('/api/', require(path.join(__dirname, 'routes', 'api', 'api.js')));

app.disable('etag');

app.get('/home', (req, res) => res.redirect('/'));

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Running server on port ${PORT}`));

module.exports = app;
