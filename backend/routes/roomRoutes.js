const express = require('express');
const router = express.Router();
const { createRoom, generateNextAnswer } = require('../utils/roomUtils');


router.post('/start', (req, res) => {
  const roomName = req.body.roomName;
  const topic = req.body.topic;

  // Start room
  let result = createRoom(roomName, topic);

  if (result === 0) res.json({
    message: "The room was created.",
    roomName: roomName,
    topic: topic
  });
  else res.json({error: error});

  generateNextAnswer(roomName, "John")
});

router.get('/list-all', (req, res) => {
  res.send(rooms);
})

module.exports = router