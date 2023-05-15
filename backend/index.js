const express = require('express');
const fs = require('fs');
const http = require('http');
const https = require('https');
const bodyParser = require('body-parser')
require('dotenv').config();
const roomRoutes = require('./routes/roomRoutes');
const app = express();
const httpsPort = process.env.HTTPS_PORT;
const httpPort = process.env.HTTP_PORT;

let privateKey = fs.readFileSync( process.env.SSL_PRIVATE_KEY );
let certificate = fs.readFileSync( process.env.SSL_CERT );

let rooms = {                               // Rooms with different topics
  exampleRoom1: {
    chatHistory: []
  },
  exampleRoom2: {
    chatHistory: []
  },
  exampleRoom3: {
    chatHistory: []
  }
}

const Message = {                           // chatHistory will include elements of this
  author: "",
  timestamp: "",
  message: ""
}


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

/** Routes */
app.use('/room', roomRoutes);

/*
https.createServer({
  key: privateKey,
  cert: certificate
}, app).listen(httpsPort);
*/

http.createServer(app).listen(httpPort);
