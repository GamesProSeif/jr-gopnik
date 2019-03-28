module.exports = () => {
  const express = require('express');
  const app = express();

  app.get('/', (req, res) => {
    res.send('Wassup');
  });

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Running server on port ${PORT}`));
}
