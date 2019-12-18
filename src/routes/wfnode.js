const express = require('express');
const router = express.Router();

/* GET workflow Node details */
router.get('/:id', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
