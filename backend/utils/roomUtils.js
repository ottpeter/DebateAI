const Message = {                           // chatHistory will include elements of this
  author: "",
  timestamp: "",
  message: ""
}

// Create a new devate room, with a topic
function createRoom(roomName, topic) {
  try {
    rooms[roomName] = {
      topic: topic,
      participants: null,
      round: 0,
      maxRounds: 500,
      chatHistory: []
    }
    return 0;
  } catch (error) {
    console.error("There was an error while trying to create new room: ", error);
    return error;
  }
}

// Loop generateNextAnswer until we reach the end of the debate
function loopUntilDone(roomId) {
  const room = global.rooms[roomId];
  const names = Object.keys(global.personalities);              // These are the personalities that we have (list of names)
  
  do {
    const index = Math.floor(Math.random() * names.length);
    const nextParticipant = names[index];

    generateNextAnswer(roomId, nextParticipant);
  } while (room.round < room.maxRounds);
}

// Generate a new answer (Message) to a room, from a participant
function generateNextAnswer(roomId, participant) {
  const personality = personalities[participant].personality;
  const topic = rooms[roomId].topic;
  const history = rooms[roomId].chatHistory;
  let first = 0;
  let messageList = null;
  if (history.length === 0) 
    messageList = "(Te kezdesz!)";
  else {
    if (history.length > 30) first = history.length - 30;
    messageList = history.map((message) => {
      return `${message.author}: "${message.message}"\n`;
    });
  }

  const tunerText = `Egy vitában veszel részt. \
  Te vagy ${participant}. \
  Ez a személyiséged: ${personality}. \
  Ez a vita témája: ${topic}. \
  Itt látható az elmúlt 30 üzenet (max): ${messageList}`;

  console.log("tunerText: ", tunerText);

  // OpenAI call

  // Insert answer into array
}

module.exports = {
  createRoom,
  generateNextAnswer,
  loopUntilDone
}