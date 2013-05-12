
var express = require('express')
  , routes = require('../routes')
  , talk = require('../routes/talk')
  , path = require('path');



module.exports = function (app, config) {
  app.get('/', routes.index);
  app.resource('talks', talk);
};
  