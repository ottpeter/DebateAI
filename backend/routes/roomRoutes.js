const express = require('express');
const router = express.Router();
const { createRoom, generateNextAnswer, loopUntilDone } = require('../utils/roomUtils');


router.post('/start', (req, res) => {
  const roomName = req.body.roomName;
  const topic = req.body.topic;

  // Start room
  let result = createRoom(roomName, topic);

  if (result === 0) res.json({
    message: "The room was created.",
    roomName: roomName,
    topic: topic,
  });
  else res.json({error: error});

  loopUntilDone(roomName);
});

router.get('/list-all', (req, res) => {
  res.send(rooms);
});

router.get('/get-messages', (req, res) => {
  const messages = rooms[req.query.roomId].chatHistory;

  res.json({
    roomId: req.query.roomId,
    messages: messages
  });
})

module.exports = router