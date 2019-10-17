"use strict";
exports = module.exports = function (app, async, mongoose) {
  app.api.oc.issueCard = function (req, res) {
    let data = req.body;
    let requirements = {
      firstName:null,
      lastName:null,
      govermentID:null
    }
    for (let k in requirements) {
      if (data[k] == null || data[k] == '' || !data[k]) {
        return res.status(400)
          .send({
            code: 400,
            message: 'Please Send ' + k,
            success: false
          });
      }
    }

    async
      .waterfall([
        function (done) {
          app
            .db
            .User
            .findOne({govermentID: req.body.govermentID})
            .exec(function (err, user) {
              if (err) {
                done(err, null);
              } else if (!user) {
                var userObj = {
                  firstName: req.body.firstName,
                  lastName: req.body.lastName,
                  email: req.body.email,
                  govermentID:req.body.govermentID
                };
                var users = new app
                  .db
                  .User(userObj);
                users.save(function (err) {
                  if (err) {
                    console.warn(err);
                  }
                  done(null, users);
                });
              }
              else{
                return res
                  .send({
                    success: false,
                    statusCode: 403,
                    message: 'One Card has already been Issued to this User',
                    data: null
                  });
              }
            })
        },
        function (user, done) {
          app
            .db
            .Card
            .findOne({
              cardID: req.body.cardID
            }, function (err, card) {
              if (err) {
                done(err, null);
              } else if (!card || card == null || card == '') {
                var cardObj = {
                  cardCredit: req.body.cardCredit,
                  cardActiveStatus: req.body.cardActiveStatus,
                  cardOwner: user._id
                };
                var cards = new app
                  .db
                  .Card(cardObj);
                cards.save(function (err) {
                  if (err) {
                    done(err,null);
                  } else {
                    return res.send({success: true, statusCode: 200, message: "Successfully Created", data: cards});
                  }
                });
              } else {
                console.log(card)
                console.log("Already Registered");
                return res
                  .status(402)
                  .send({
                    success: false,
                    statusCode: 402,
                    message: 'This Card has already been Issued to another User,Please come back with another ' +
                        'Card',
                    data: null
                  });
              }
            });
        }
      ], function (err) {
        if (err) {
          return res.send({success: false, statusCode: 500, message: 'Internal Server Error', data: null});
        }
      });
  }
};