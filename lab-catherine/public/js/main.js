'use strict';

const socket = io();

const sendMessageForm = document.getElementById('message-form');
const messageInput = document.getElementById('message-input');
const messagesContainer = document.getElementById('messages');
const usernameForm = document.getElementById('username-form');
const avatarForm = document.getElementById('avatar-form');

usernameForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const usernameEl = document.getElementById('username-input');
  const username = usernameEl.value;
  if(username === '') {
    return;
  } else {
    socket.emit('submit-username', {username});
    let header = document.getElementById('welcome');
    header.textContent = 'Welcome: ' + username.toUpperCase() + '!';
  
  }
});

sendMessageForm.addEventListener('submit', (event) => {
  event.preventDefault();
  let message = messageInput.value;
  socket.emit('send-message', {message: message});
  messageInput.value = '';
});

socket.on('receive-message', (data) => {
  let message = new ChatMessage(data);
  message.render(messagesContainer);
  // div.textContent = timestamp + ' |    ' + alias + ':     ' + data.message;
  // messagesContainer.appendChild(div);
});

socket.on('set-header', (data) => {
  let alias = data.username.toUpperCase();
  let header = document.getElementById('welcome');
  header.append('Welcome: ' + alias + '!');
});

avatarForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const avatarEl = document.getElementById('avatar-input');
  const avatar = avatarEl.value;
  socket.emit('submit-avatar', {avatar: avatar});

});

