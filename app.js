
/**
 * Module dependencies.
 */

var express = require('express')
  , Resource = require('express-resource')
  , http = require('http');

var app = express();

// express settings
var config = require('./config/config')[app.get('env')];
require('./config/express')(app, config);
require('./config/routes')(app, config);


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
