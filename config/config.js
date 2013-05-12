var path = require('path')
  , rootPath = path.normalize(__dirname + '/..')

module.exports = {
  development: {
    root: rootPath,
    db: 'mongodb://localhost/noobjs_dev',
    baseUrl: 'http://localhost:3000'
  },
  production: {

  },
  staging: {

  }
};