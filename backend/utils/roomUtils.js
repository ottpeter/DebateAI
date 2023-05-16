const { getAnswer } = require("./openaiUtils");

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
async function loopUntilDone(roomId) {
  const room = global.rooms[roomId];
  const names = Object.keys(global.personalities);              // These are the personalities that we have (list of names)
  
  do {
    const index = Math.floor(Math.random() * names.length);
    const nextParticipant = names[index];
    global.rooms[roomId].round++;

    await generateNextAnswer(roomId, nextParticipant);
  } while (room.round < room.maxRounds);
}

// Generate a new answer (Message) to a room, from a participant
async function generateNextAnswer(roomId, participant) {
  const personality = global.personalities[participant].personality;
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
  Itt látható az elmúlt 30 üzenet (max): ${messageList} \
  Szólj hozzá a vitához, a nevedet ne írd le, csak reagálj arra, amit a többiek eddig írtak (egyes szám első személyben beszéljél!). \
  Az előbbi listában a saját korábbi hozzászólásaidat is látod!`;

  console.log("tunerText: ", tunerText);

  const answer = await getAnswer(tunerText);

  if (answer.success) {
    console.log(answer.text);

    const theMessage = Object.assign({}, Message);
    theMessage.author = participant;
    theMessage.message = answer.text;
    theMessage.timestamp = Date.now();

    // Insert answer into array
    global.rooms[roomId].chatHistory.push(theMessage)


  } else {
    console.error(answer.error);
  }
}

module.exports = {
  createRoom,
  generateNextAnswer,
  loopUntilDone
}