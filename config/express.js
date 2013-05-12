

var express = require('express')
  , i18n = require("i18n")
  , path = require('path');

module.exports = function (app, config) {

  //i18n
  i18n.configure({
    // setup some locales - other locales default to en silently
    locales:['en', 'es'],

    // you may alter a site wide default locale
    defaultLocale: 'en',

    directory: '../locales',
  });

  // all environments
  app.set('port', process.env.PORT || 3000);
  app.set('views', config.root + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(config.root, 'public')));
  app.use(i18n.init);
  console.log(i18n.getCatalog());
  app.locals({
    __: i18n.__,
    config: config
  });

  // development only
  if ('development' == app.get('env')) {
    app.use(express.errorHandler());
  }


  
};