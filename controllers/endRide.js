"use strict";
var constants = require('../Constants/constants');
exports = module.exports = function (app, async) {
    app.api.oc.endRide = function (req, res) {
      let data = req.body;
      let requirements = {
        endstation:null,
        cardID:null
      }
      function findZone(place) {
        let zones = constants.ZONES;
        switch (place){
          case 'holborn':
            return zones.holborn;
          case 'hammersmith':
            return zones.hammersmith;
          case 'earlscourt':
            return zones.earlscourt;
          case 'wimbledon':
            return zones.wimbledon
          default:
            return undefined
        }
      }
      function calFare(z1 ,z2) {
        var fares = constants.FARES;
        switch (z1+'-'+z2){
          case "zoneOne-zoneOne":
            return fares.withInZoneOne;
          case "zoneTwo-zoneTwo":
          case "zoneThree-zoneThree":
            return fares.withInZoneOne;
          case "zoneOne-zoneTwo":
          case "zoneTwo-zoneOne":
            return fares.anyTwoZonesIncludingZoneOne;
          case "zoneTwo-zoneThree":
          case "zoneThree-zoneTwo":
            return fares.anyTwoZonesExcludingZoneOne;
          case "zoneOne-zoneThree":
          case "zoneThree-zoneOne":
            return fares.anyThreeZones;
          default:
            return undefined;
        }
      }
      for (let k in requirements) {
        if (data.endstation == null || data[k] == '' || data[k]== null) {
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
            app.db.Ride.findOne({card:card._id})
              .sort({startingTime: -1})
              .exec(function (err,ride) {
                if(err){
                  done(err,null);
                }else{
                  if(!ride.rideActive){
                    var startingZone = findZone(ride.startingPoint);
                    var endingZone = findZone(req.body.endstation);
                    var finalFare = calFare(startingZone[0],endingZone[0]);
                    var returningAmmount = constants.FARES.maxFare - finalFare;
                    card.cardCredit = card.cardCredit + returningAmmount;
                    card.save(function (err) {
                      if (err) {
                        done(err,null);
                      } else {
                        done(null,card,ride)
                      }
                    });
                  }else {
                    return res.send({
                      success: true,
                      statusCode: 202,
                      message: 'Ride Already Ended',
                      data: ride,card
                    });
                  }
                }
              });
          },function (card,ride,done) {
            ride['endingPoint'] =req.body.endingPoint;
            ride['rideActive'] =false;

            ride.save(function (err) {
              if (err) {
                done(err,null);
              } else {
                return res.send({
                  success: true,
                  statusCode: 200,
                  message: 'Success',
                  data: ride,card
                });
              }
            });
          }
        ],
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