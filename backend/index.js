const express = require('express');
const fs = require('fs');
const http = require('http');
const https = require('https');
require('dotenv').config();
const testRoutes = require('./routes/backup');
const app = express();
const httpsPort = process.env.HTTPS_PORT;
const httpPort = process.env.HTTP_PORT;

let privateKey = fs.readFileSync( process.env.SSL_PRIVATE_KEY );
let certificate = fs.readFileSync( process.env.SSL_CERT );

let rooms = {                               // Rooms with different topics

}

let chatHistory = [];                       // Chat history of the room

const Message = {                           // chatHistory will include elements of this
  author: "",
  timestamp: "",
  message: ""
}

/** Routes */
app.use('/test', testRoutes);

/*
https.createServer({
  key: privateKey,
  cert: certificate
}, app).listen(httpsPort);
*/

http.createServer(app).listen(httpPort);
