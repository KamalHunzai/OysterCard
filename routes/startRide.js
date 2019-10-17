/**
 * @api {post} /api.oc.startRide    Start your Tour on Public Transport Across the London City
 * @apiName  Start your Tour on Public Transport Across the London City
 * @apiGroup Start your Tour on Public Transport Across the London City
 *
 * @apiParam {String} station Name of Station that you have choose to start traveling.
 * @apiParam {String} travelingByBus  0 or 1 , 0 represents false and 1 represents true.
 * @apiParam {String} cardID   Your valid Card
 *
 @apiSuccessExample Success-Response:
 *
 * {
       "success": true,
    "statusCode": 200,
    "message": "Successfully Charged your Card for Ride, Enjoy your Ride",
    "data": {
        "Here are details for the fares": {
            "withInZoneOne": "2.50",
            "anyOneZoneOutsideZoneOne": "2.00",
            "anyTwoZonesIncludingZoneOne": "3.00",
            "anyTwoZonesExcludingZoneOne": "2.25",
            "anyThreeZones": "3.20",
            "anyBusJourney": "1.80",
            "maxFare": "3.20"
        },
        "Credit": 63.39999999999999
    }
    }
 @apiErrorExample Error - Internal Server Error:
 *
 *     {
     *       "success": false,
     *       "statusCode": 500,
     *       "message": "Internal Server Error",
     *       "data": err
     *
     *     }
 */
"use strict";
exports = module.exports = function (app) {
  app.post('/api.oc.startRide', app.api.oc.startRide);
};
