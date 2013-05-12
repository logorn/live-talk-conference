
/**
 * Module dependencies.
 */

var express = require('express')
  , Resource = require('express-resource')
  , http = require('http')
  , socketio = require('socket.io')
  , chat = require('./routes/chat')
  , fs = require("fs")
  , mongoose = require('mongoose');



// Bootstrap models
var models_path = __dirname + '/models'
fs.readdirSync(models_path).forEach(function (file) {
  require(models_path+'/'+file)
})

// express settings
var app = express();
var config = require('./config/config')[app.get('env')];
require('./config/express')(app, config);
require('./config/routes')(app, config);

mongoose.connect(config.db);

var server = http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
var io = socketio.listen(server);
io.sockets.on('connection', chat.handleConnection);
