const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const faker = require('faker');

app.use(express.static('./public'));

const PLAYERS = {};

io.on('connection', (socket) => {
  PLAYERS[socket.id] = {};
  PLAYERS[socket.id].username = faker.fake('{{name.jobTitle}}');
  console.log(PLAYERS[socket.id].username);

  socket.emit('set-header', {username: PLAYERS[socket.id].username});


  io.emit('playerdata', PLAYERS);

  console.log('JOINED', PLAYERS[socket.id].username);

  socket.on('disconnect', () => {
    console.log('LEFT', socket.id);
    delete PLAYERS[socket.id];
  });

  socket.on('send-message', (data) => {
    data.username = PLAYERS[socket.id].username;
    console.log('MESSAGE:', data.message);
    io.emit('receive-message', data);
  });

  socket.on('submit-username', (msg) => {
    console.log(msg.username);
    if(msg.username === '')
      return;
    console.log(PLAYERS);
    PLAYERS[socket.id].username = msg.username;
    io.emit('playerdata', PLAYERS);
    console.log(PLAYERS);
  });

});

let port = 3000;
http.listen(port, () => {
  console.log('http://localhost:' + port);
});
