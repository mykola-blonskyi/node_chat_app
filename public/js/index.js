var socket = io();

socket.on('connect', function () {
  console.log('connected to server');
});

socket.on('disconnect', function () {
  console.log('dosconnected from server');
});

socket.on('newMessage', function (msg) {
  console.log('new message: ', msg);

  var li = jQuery('<li></li>');
  li.text(`${msg.from}: ${msg.text}`);

  jQuery('#messages').append(li);
});

socket.on('newLocationMsg', function (locationMsg) {
  var li = jQuery('<li></li>');
  var a = jQuery('<a target="_blank">my current location</a>');

  li.text(`${locationMsg.from}: `);
  a.attr('href', locationMsg.url);
  li.append(a);

  jQuery('#messages').append(li);
});

jQuery(document).ready(function () {
  jQuery('#message_from').on('submit', function (e) {
    e.preventDefault();

    socket.emit('createMessage', {
      from: 'User',
      text: jQuery('[name=message]').val()
    }, function () {
      console.log('was send: ');
    });
  });

  var location_btn = jQuery('#send_location');

  location_btn.on('click', function (e) {
    e.preventDefault();

    if(!navigator.geolocation){
      return alert('Geolocation not supported');
    }

    navigator.geolocation.getCurrentPosition(
      function (position) {
        socket.emit('createLocationMsg', {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
      },
      function () {
        alert('unable fetch location')
      }
    );
  });
});