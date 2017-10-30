var socket = io();

function scrollToBottom() {
  var messeges = jQuery('#messages');
  var newMessage = messeges.children('li:last-child');

  var clientHeight = messeges.prop('clientHeight');
  var scrollTop = messeges.prop('scrollTop');
  var scrollHeight = messeges.prop('scrollHeight');
  var newMessageHeight = newMessage.innerHeight();
  var lastMessageHeight = newMessage.prev().innerHeight();

  if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight){
    messeges.scrollTop(scrollHeight);
  }
}

socket.on('connect', function () {
  var params = jQuery.deparam(window.location.search);
  socket.emit('join', params, function (err) {
    if(err){
      alert(err);
      window.location.href = '/';
    } else {
      console.log('No error');
    }
  });
});

socket.on('disconnect', function () {
  console.log('dosconnected from server');
});

socket.on('updateUserList', function (users) {
  var ol = jQuery('<ul></ul>');

  users.forEach(function (user) {
    ol.append(jQuery('<li></li>').text(user));
  });

  jQuery('#users').html(ol);
});

socket.on('newMessage', function (msg) {
  var template = jQuery('#message-template').html();
  var html = Mustache.render(template, {
    text: msg.text,
    from: msg.from,
    time: moment(msg.created_at).format('HH:mm')
  });

  jQuery('#messages').append(html);
  scrollToBottom();
});

socket.on('newLocationMsg', function (locationMsg) {
  var template = jQuery('#location-message-template').html();
  var html = Mustache.render(template, {
    url: locationMsg.url,
    from: locationMsg.from,
    time: moment(locationMsg.created_at).format('HH:mm')
  });

  jQuery('#messages').append(html);
  scrollToBottom();
});

jQuery(document).ready(function () {
  jQuery('#message_form').on('submit', function (e) {
    e.preventDefault();

    var msgTextBox = jQuery('[name=message]');

    if(msgTextBox.val() !== ''){
      socket.emit('createMessage', {
        text: msgTextBox.val()
      }, function () {
        msgTextBox.val('');
      });
    }
  });

  var location_btn = jQuery('#send_location');

  location_btn.on('click', function (e) {
    e.preventDefault();

    if(!navigator.geolocation){
      return alert('Geolocation not supported');
    }

    location_btn.attr('disabled', 'disabled').text('Sending location...');

    navigator.geolocation.getCurrentPosition(
      function (position) {
        location_btn.removeAttr('disabled').text('Send location');
        socket.emit('createLocationMsg', {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
      },
      function () {
        location_btn.removeAttr('disabled').text('Send location');
        alert('unable fetch location')
      }
    );
  });
});