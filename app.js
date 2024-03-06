require('dotenv').config();
const Server = require('./models/server');
const server = new Server();

server.listen(3008, () => {
    console.log('Server started on port 3008');
});