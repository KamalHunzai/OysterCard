/**
 * @api {post} /api.oc.issueCard    Issue a new Card from Authrority
 * @apiName  Issue a new Card from Authrority
 * @apiGroup Issue a new Card from Authrority
 *
 * @apiParam {String} govermentID Verified ID number/Aplha Numeric  Provided by Goverment.
 * @apiParam {String} email  email ID of Card Owner.
 * @apiParam {String} firstName   FirstName of Card User
 * @apiParam {String} lastName   Last Name of Card User
 * @apiParam {String} cardCredit   Last Name of Card User
 * @apiParam {cardActiveStatus} cardCredit   Last Name of Card User
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
  app.post('/api.oc.issueCard', app.api.oc.issueCard);
};