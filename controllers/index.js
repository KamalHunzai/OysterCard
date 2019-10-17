"use strict";
exports = module.exports = function (app,async) {
  app.api = {};
  app.api.oc = {};
  app.api.oc.users = {};
  require('./issueACard')(app,async);
  require('./startRide')(app,async);
  require('./endRide')(app,async);
  require('./rechargeCard')(app,async);
}