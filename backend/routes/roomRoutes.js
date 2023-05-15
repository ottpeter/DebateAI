const express = require('express');
const router = express.Router();
const { hello } = require('../utils/helloUtil');


router.post('/start', (req, res) => {
  const roomName = req.body.roomName;
  const topic = req.body.topic;

  // Start room
  rooms[roomName] = null;

  res.json({
    message: "The room was started.",
    roomName: roomName,
    topic: topic
  });
});

module.exports = router