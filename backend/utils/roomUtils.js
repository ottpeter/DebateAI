const Message = {                           // chatHistory will include elements of this
  author: "",
  timestamp: "",
  message: ""
}

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

module.exports = {
  createRoom
}