const { Router } = require('express');
const router = new Router();

router.get('/', (req, res) => {
  res.status(400).json({error: 'Main API page. Specify a valid API url. See docs'});
});

module.exports = router;
