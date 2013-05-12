
var express = require('express')
  , routes = require('../routes')
  , talk = require('../routes/talk')
  , chat = require('../routes/chat')
  , path = require('path');



module.exports = function (app, config) {
  app.get('/', routes.index);
  app.get('/chat', chat.index);
  app.resource('talks', talk);
};
  