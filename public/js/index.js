var socket = io();

socket.on('connect', function () {
  console.log('connected to server');
});

socket.on('disconnect', function () {
  console.log('dosconnected from server');
});

socket.on('newMessage', function (msg) {
  console.log('new message: ', msg);
});