

var express = require('express')
  , path = require('path');

module.exports = function (app, config) {
  // all environments
  console.log(config.root + '/views');
  app.set('port', process.env.PORT || 3000);
  app.set('views', config.root + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(config.root, 'public')));

  // development only
  if ('development' == app.get('env')) {
    app.use(express.errorHandler());
  }
};