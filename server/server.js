module.exports = (bot) => {
  const express = require('express');
  const exphbs = require('express-handlebars');
  const favicon = require('serve-favicon');
  const path = require('path');
  const app = express();
  app.use(express.static(path.join(__dirname, 'public')));
  app.use(favicon(path.join(__dirname, 'public', 'favicon.png')));

  // Handlebars Middleware
  app.engine('handlebars', exphbs({
    defaultLayout: 'main'
  }));
  app.set('view engine', 'handlebars');

  // Body Parser Middleware
  app.use(express.json());
  app.use(express.urlencoded({
    extended: false
  }));

  app.get('/', (req, res) => {
    res.send('Welcome to the server');
  });

  app.use('/api/', require(path.join(__dirname, 'routes', 'api', 'api.js'))(bot));

  app.disable('etag');

  app.get('/home', (req, res) => res.redirect('/'));

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Running server on port ${PORT}`));
}