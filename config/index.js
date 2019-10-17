"use strict";
exports = module.exports = function (app,mongoose) {
  var env = require('./env_config');
  app.set('host',env.host);
  app.set('databaseURL',env.dburl);
  require('./database')(app,mongoose);

  console.log("Server: "+ env.host);
  console.log("DatabaseURL: "+ env.dburl);
};