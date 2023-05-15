const express = require('express');
const router = express.Router();
const { hello } = require('../utils/helloUtil');


router.post('/start', (req, res) => {
  const roomName = req.body.roomName;
  const topic = req.body.topic;

  const resultObj = {
    roomName,
    topic
  }

  res.json(resultObj);
});

module.exports = router