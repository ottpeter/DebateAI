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
      chatHistory: []
    }
    return 0;
  } catch (error) {
    console.error("There was an error while trying to create new room: ", error);
    return error;
  }
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
  Itt látható az elmúlt max 30 üzenet: ${messageList}`;

  console.log("tunerText: ", tunerText);

}

module.exports = {
  createRoom,
  generateNextAnswer

}