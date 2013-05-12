exports.index = function(req, res){
  var isSpeaker = req.query.is_speaker === 'true';
  res.render('chat', {title: 'Welcome to this talk', isSpeaker: isSpeaker});
};

var users = {};

exports.handleConnection = function (socket) {
  var username;

  function message(m) {
    return username + '> ' + m;
  }

  socket.on('register', function (data) {
    username = data.username;
    users[socket.id] = {
      username: username,
      socket: socket
    };
    socket.broadcast.emit('notify', { message: message('connected') });
  });

  socket.on('message', function (data) {
    socket.broadcast.emit('notify', { message: message(data.message) });
  });

  socket.on('setPage', function(data) {
    socket.broadcast.emit('setPage', {pageNum: data.pageNum});
  });

  socket.on('disconnect', function (data) {
    if (users[socket.id]) {
      delete users[socket.id];
      socket.broadcast.emit('notify', { message: message('disconnected') });
    }
  });
}
