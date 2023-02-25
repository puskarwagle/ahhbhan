const express = require("express");
const app = express();
const path = require("path");
const cors = require('cors');

app.use(cors());
app.use(express.static('public'));
app.use(express.json());
const PORT = process.env.PORT || 5005;

const server = require('http').Server(app);
const io = require('socket.io')(server);

// Handle incoming connections
io.on('connection', (socket) => {
  console.log(`New user connected with ID ${socket.id}`);

  // Handle incoming messages
  socket.on('chatMessage', (message) => {
    console.log(`New message: ${message}`);
    // Broadcast the message to all connected clients
    io.emit('chatMessage', message);
  });

  // Handle disconnections
  socket.on('disconnect', () => {
    console.log(`User disconnected with ID ${socket.id}`);
  });
});

// Start the server
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
