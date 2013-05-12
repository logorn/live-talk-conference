$(document).ready(function() {
    console.log('aa');
    var socket = io.connect('http://localhost'),
        username = $('#username')[0],
        submitName = $('#submitName'),
        userForm = $('#userForm');
        chatContainer = $('#chatContainer');

    submitName.on('click', function() {
        socket.emit('register', {username: username.value});
        userForm.hide();
        chatContainer.show();
    });
});
