"use strict";
var constants = require('../Constants/constants');
exports = module.exports = function (app, async) {
    app.api.oc.startRide = function (req, res) {
      let data = req.body;
      let requirements = {
        station:null,
        travelingByBus:null,
        cardID:null
      }
      for (let k in requirements) {
        if ((data.station == null) && (data.travelingByBus == null) || data[k] == '') {
          return res.status(400)
            .send({
              code: 400,
              message: 'Please Mention ' + k,
              success: false
            });
        }
      }
      async.waterfall([
          function (done) {
            app.db
              .Card
              .findOne({cardID: req.body.cardID})
              .exec(function (err, card) {
                if (err) {
                  done(err, null);
                } else if (card) {
                done(null,card)
                }
              })
          },
          function (card,done) {
            var rideObj = {
              startingPoint: req.body.station,
              endingPoint:undefined,
              rideActive:true,
              travelingByBus:undefined,
              card:card._id
            };

          // 0 or 1 is used here for true false flags.
            if (constants.FARES.maxFare <= card.cardCredit){
          if(req.body.travelingByBus == 1)  {
           card.cardCredit = card.cardCredit - constants.FARES.anyBusJourney;
           card.save(function (err) {
              if (err) {
                done(err,null);
              } else {
                rideObj.travelingByBus = true;
                done(null,card,rideObj);
              }
            });
          }else {
              card.cardCredit = card.cardCredit - constants.FARES.maxFare;
              card.save(function (err) {
                if (err) {
                  done(err,null);
                } else {
                  rideObj.travelingByBus = false;
                  done(null,card,rideObj);
                }
              });
            }
          } else {
              return res.send({
                success: false,
                statusCode: 400,
                message: "Oops! You don't have enough Credit to take this Ride,Please recharge soon, We hope to see you soon!",
                data: null
              });
            }
          },
        function(card,rideObj,done) {


          var ride = new app
            .db
            .Ride(rideObj);
          ride.save(function (err) {
            if (err) {
              done(err,null);
            } else {
              return res.send({
                success: true,
                statusCode: 200,
                message: "Successfully Charged your Card for Ride, Enjoy your Ride",
                data: {"Here are details for the fares":constants.FARES, "Credit":card.cardCredit}
              });
            }
          });
        }],
        function (err) {
        if (err) {
          return res.send({
            success: false,
            statusCode: 500,
            message: 'Internal Server Error',
            data: null
          });
        }
      });
    }
};