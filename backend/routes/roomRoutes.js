const express = require('express');
const router = express.Router();
const { hello } = require('../utils/helloUtil');


router.post('/start', (req, res) => {
  console.log(req.body)
});

module.exports = router