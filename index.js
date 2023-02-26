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

// Serve login page as the default page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'login.html'));
});

// Handle login form submission
app.post('/login', (req, res) => {
  const { username } = req.body;
  // TODO: validate the username
  res.redirect('/index.html');
});

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

app.get('/service-worker.js', (req, res) => {
  res.sendFile(path.join(__dirname, 'service-worker.js'));
});


// Start the server
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

