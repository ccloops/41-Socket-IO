const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.use(express.static('./public'));

io.on('connection', (socket) => {
  console.log('JOINED', socket.id);

  socket.on('disconnect', () => {
    console.log('LEFT', socket.id);
  });

  socket.on('send-message', (data) => {
    console.log('MESSAGE:', data.message);
    io.emit('receive-message', data);
  });
});

let port = 3000;
http.listen(port, () => {
  console.log('http://localhost:' + port);
});



