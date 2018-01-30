'use strict';

class ChatMessage {
  constructor(message) {
    this.timestamp = message.timestamp;
    this.username = message.username;
    this.message = message.message;
    this.avatar = message.avatar;
  }

  render(parentElement) {
    const container = document.createElement('div');
    const timestamp = document.createElement('span');
    const avatar = document.createElement('img');
    const username = document.createElement('span');
    const message = document.createElement('span');

    container.classList.add('message');
    timestamp.classList.add('timestamp');
    username.classList.add('username');

    timestamp.textContent = this.timestamp;
    username.textContent = this.username + ': ';
    message.textContent = this.message;
    avatar.src = this.avatar;

    container.appendChild(avatar);
    container.appendChild(timestamp);
    container.appendChild(username);
    container.appendChild(message);

    parentElement.appendChild(container);
  }
}