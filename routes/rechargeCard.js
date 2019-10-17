/**
 * @api {post} /api.oc.rechargeCard    Recharge your Card to Travel
 * @apiName  Recharge your Card to Travel
 * @apiGroup Recharge your Card to Travel
 *
 * @apiHeader {Number} creditAmmount Enter an ammount to add, this will be later replaced with a payment gateway
 * @apiParam {String} cardID  you card ID i-e ALPHA
 *
 @apiSuccessExample Success-Response:
 *
 *{
    "success": true,
    "statusCode": 200,
    "message": "Sucessfully Recharged",
    "data": {
        "Your new Balance is ": 66.6
    }
}


 @apiErrorExample Error - Insufficient Ammount:
 *
 *     {
     *       "success": false,
     *       "statusCode": 501,
     *       "message": "Cannot a number less than One",
     *         "data":null
     *     }
 *     @apiErrorExample Error - Internal Server Error:
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
  app.post('/api.oc.rechargeCard',app.api.oc.rechargeCard);
};
