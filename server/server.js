module.exports = (bot) => {
  const express = require('express');
  const exphbs = require('express-handlebars');
  const path = require('path');

  const app = express();

  // Handlebars Middleware
  app.engine('handlebars', exphbs({defaultLayout: 'main'}));
  app.set('view engine', 'handlebars');

  // Body Parser Middleware
  app.use(express.json());
  app.use(express.urlencoded({extended: false}));

  app.use('/api/', require(path.join(__dirname, 'routes', 'api', 'api.js')));

  app.get('/', (req, res) => {
    res.send('Welcome to the server');
  });

  app.get('/home', (req, res) => res.redirect('/'));

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Running server on port ${PORT}`));
}
