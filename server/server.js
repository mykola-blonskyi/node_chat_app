const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const app = express();
const public_path = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(public_path));

io.on('connection', (socket) => {
  console.log('new user connected');

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.emit('newMessage', {
    from: 'Admin',
    text: 'Welcome to the chat app',
    created_at: new Date().getTime()
  });

  socket.broadcast.emit('newMessage', {
    from: 'Admin',
    text: 'New user joined',
    created_at: new Date().getTime()
  });

  socket.on('createMessage', (msg) => {
    console.log('new message: ', msg);

    io.emit('newMessage', {
      from: msg.from,
      text: msg.text,
      created_at: new Date().getTime()
    });

    // socket.broadcast.emit('newMessage', {
    //   from: msg.from,
    //   text: msg.text,
    //   created_at: new Date().getTime()
    // });
  });
});

server.listen(port, () => console.log(`Server started on ${port} port.`));