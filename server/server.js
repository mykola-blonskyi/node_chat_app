const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');

const app = express();
const public_path = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
const server = http.createServer(app);
const io = socketIO(server);
const users = new Users();

app.use(express.static(public_path));

io.on('connection', (socket) => {
  console.log('new user connected');

  socket.on('disconnect', () => {
    let user = users.removeUser(socket.id);

    if(user){
      io.to(user.room).emit('updateUserList', users.getUserList(user.room));
      io.to(user.room).emit('newMessage', generateMessage('System', `${user.name} has left chat room.`));
    }
  });

  socket.on('createMessage', (msg, callback) => {
    let user = users.getUser(socket.id);

    if(user && isRealString(msg.text)){
      io.to(user.room).emit('newMessage', generateMessage(user.name, msg.text));
    }

    callback();
  });

  socket.on('createLocationMsg', (coords) => {
    let user = users.getUser(socket.id);

    if(user) {
      io.to(user.room).emit('newLocationMsg', generateLocationMessage(user.name, coords.latitude, coords.longitude));
    }
  });

  socket.on('join', (params, callback) => {
    if(!isRealString(params.name) || !isRealString(params.room)){
      return callback('Name and room name are required');
    }

    socket.join(params.room);
    // socket.leave('Room name');

    // io.emit -> io.to('Room name').emit
    // socket.broadcast.emit -> socket.broadcat.to('Room name').emit
    // socket.emit

    users.removeUser(socket.id);
    users.addUser(socket.id, params.name, params.room);

    io.to(params.room).emit('updateUserList', users.getUserList(params.room));

    socket.emit('newMessage', generateMessage('System', 'Welcome to the chat app'));
    socket.broadcast.to(params.room).emit('newMessage', generateMessage('System', `${params.name} has joined.`));

    callback();
  });
});

server.listen(port, () => console.log(`Server started on ${port} port.`));