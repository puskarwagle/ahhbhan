console.log('ahhbhan');

const socket = io();

const messageForm = document.getElementById('message-form');
const messageInput = document.getElementById('message-input');
const messageContainer = document.getElementById('message-container');
const savedMessagesContainer = document.getElementById('saved-messages-container');

// Handle incoming messages
socket.on('chatMessage', (message, timestamp) => {
  const messageElement = document.createElement('div');
  messageElement.classList.add('message');
  messageElement.textContent = message;
  messageContainer.append(messageElement);

  // Save message to local storage
  const messages = JSON.parse(localStorage.getItem('messages')) || [];
  messages.push({ message, timestamp: new Date().getTime() });
  localStorage.setItem('messages', JSON.stringify(messages));
});

// Display saved messages with timestamps
const savedMessages = JSON.parse(localStorage.getItem('messages')) || [];
for (const savedMessage of savedMessages) {
  const savedMessageElement = document.createElement('div');
  savedMessageElement.classList.add('saved-message');

  // Convert the timestamp number back to a Date object
  const timestamp = new Date(savedMessage.timestamp);
  const formattedTimestamp = `${timestamp.toLocaleDateString()} ${timestamp.toLocaleTimeString()}`;

  savedMessageElement.innerHTML = `${savedMessage.message} - ${formattedTimestamp}`;
  savedMessagesContainer.append(savedMessageElement);
}

// Handle message submission
messageForm.addEventListener('submit', e => {
  e.preventDefault();
  const message = messageInput.value.trim();
  if (message === '') {
    return;
  }
  socket.emit('chatMessage', message, new Date().getTime());
  messageInput.value = '';
});

const clearStorageButton = document.createElement('button');
clearStorageButton.textContent = 'Clear Storage';
clearStorageButton.addEventListener('click', () => {
  localStorage.clear();
  savedMessagesContainer.innerHTML = '';
});
messageContainer.prepend(clearStorageButton);
