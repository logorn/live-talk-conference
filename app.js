
/**
 * Module dependencies.
 */

var express = require('express')
  , Resource = require('express-resource')
  , http = require('http')
  , socketio = require('socket.io')
  , chat = require('./routes/chat');


// express settings
var app = express();
var config = require('./config/config')[app.get('env')];
require('./config/express')(app, config);
require('./config/routes')(app, config);

var server = app.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
var io = socketio.listen(server);
io.sockets.on('connection', chat.handleConnection);
