const express = require('express');
const port = 5000;

const app = express();

require('dotenv').config();
const Server = require('./models/server');
const server = new Server();

server.listen();

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
  });