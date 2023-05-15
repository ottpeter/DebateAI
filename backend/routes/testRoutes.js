const express = require('express');
const router = express.Router();
const { hello } = require('../utils/helloUtil');


router.get('/', (req, res) => {
  res.send(hello());
});

module.exports = router