"use strict";
exports = module.exports = function (app) {
  require('./issueACard')(app);
  require('./startRide')(app);
  require('./endRide')(app);
  require('./rechargeCard')(app);

}
