const socket = io();
console.log('ID:', socket.id);

const sendMessageForm = document.getElementById('message-form');
const messageInput = document.getElementById('message-input');
const messagesContainer = document.getElementById('messages');
const usernameForm = document.getElementById('username-form');

usernameForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const usernameEl = document.getElementById('username-input');
  const username = usernameEl.value;
  if(username === '') {
    return;
  } else {
    socket.emit('submit-username', {username});
  }
});

sendMessageForm.addEventListener('submit', (event) => {
  event.preventDefault();
  let message = messageInput.value;
  socket.emit('send-message', {message: message});
});

socket.on('receive-message', (data) => {
  console.log('RECEIVED:', data);
  let div = document.createElement('div');
  let alias = data.username;
  div.textContent = alias + ':' + data.message;
  messagesContainer.appendChild(div);
});