const socket = io();
console.log('ID:', socket.id);

let sendMessageForm = document.getElementById('message-form');
let messageInput = document.getElementById('message-input');
let messagesContainer = document.getElementById('messages');

sendMessageForm.addEventListener('submit', (event) => {
  event.preventDefault();
  let message = messageInput.value;
  socket.emit('send-message', {message: message});
});

socket.on('receive-message', (data) => {
  console.log('RECEIVED:', data);
  let div = document.createElement('div');
  div.textContent = data.message;
  messagesContainer.appendChild(div);
});