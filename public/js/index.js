var socket = io();

socket.on('connect', function () {
  console.log('connected to server');

  socket.emit('createEmail', {
    to: 'test2@test.test',
    text: 'aloha'
  });

  socket.emit('createMessage', {
    from: 'Nick',
    text: 'test text'
  });
});

socket.on('disconnect', function () {
  console.log('dosconnected from server');
});

socket.on('newEmail', function (email) {
  console.log('new email: ', email);
});

socket.on('newMessage', function (msg) {
  console.log('new message: ', msg);
});