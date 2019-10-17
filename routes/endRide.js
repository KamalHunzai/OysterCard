/**
 * @api {post} /api.oc.endRide    End your Ride
 * @apiName  Issue a new Card from Authrority
 * @apiGroup Issue a new Card from Authrority
 *
 * @apiParam {String} name of station where you end your jounrney.
 * @apiParam {String} cardID:   your Card ID .

 *
 @apiSuccessExample Success-Response:
 *
 * {
        "statusCode": 200,
        "success": true,
         "message": "Thank you for signing Up with us.",
        "data": {
        "Remaining Credit": ""


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
  app.post('/api.oc.endRide', app.api.oc.endRide);
};