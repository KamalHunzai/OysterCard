"use strict";
exports = module.exports = function (app, mongoose) {
  require('./user')(app, mongoose);
  require('./card')(app, mongoose);
  require('./rides')(app, mongoose);
};