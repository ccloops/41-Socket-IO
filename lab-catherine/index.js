'use strict';

const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const faker = require('faker');

app.use(express.static('./public'));

const CHATMEMBERS = {};

io.on('connection', (socket) => {
  CHATMEMBERS[socket.id] = {};
  CHATMEMBERS[socket.id].username = faker.fake('{{name.jobTitle}}');
  CHATMEMBERS[socket.id].avatar = 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/1859-Martinique.web.jpg/220px-1859-Martinique.web.jpg';

  socket.emit('set-header', {username: CHATMEMBERS[socket.id].username});

  socket.on('disconnect', () => {
    delete CHATMEMBERS[socket.id];
  });

  socket.on('send-message', (data) => {
    data.timestamp = new Date().toLocaleTimeString();
    data.username = CHATMEMBERS[socket.id].username;
    data.avatar = CHATMEMBERS[socket.id].avatar;
    io.emit('receive-message', data);
  });

  socket.on('submit-username', (msg) => {
    if(msg.username === '')
      return;
    CHATMEMBERS[socket.id].username = msg.username;
  });

  socket.on('submit-avatar', (data) => {
    CHATMEMBERS[socket.id].avatar = data.avatar;
  });

});

let port = 3000;
http.listen(port, () => {
  console.log('http://localhost:' + port);
});
