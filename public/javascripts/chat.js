$(document).ready(function() {
    var socket = io.connect('http://localhost'),
        username = $('#username')[0],
        submitName = $('#submitName'),
        userForm = $('#userForm');
        chatContainer = $('#chatContainer'),
        message = $('#message');

    submitName.on('click', function() {
        socket.emit('register', {username: username.value});
        userForm.hide();
        chatContainer.show();
    });

    message.on('keydown', function(e) {
      debugger;
      if (e.keyCode == 13) {
        socket.emit('message', {message: message[0].value});
        message[0].value = '';
      }
    });

    socket.on('notify', function(m) {
      chatContainer.children().first().append('<p>' + m.message + '</p>');
    });
});
