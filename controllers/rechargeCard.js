"use strict";
exports = module.exports = function (app, async) {
  app.api.oc.rechargeCard = function (req, res) {
    let data = req.body;
    let requirements = {
      creditAmmount:null,
      cardID:null
    }
    for (let k in requirements) {
      if (data[k] == null || data[k] == '') {
        return res
          .send({
            code: 400,
            message: 'Please Mention ' + k,
            success: false
          });
      }
    }
    async
      .waterfall([
          function (done) {
            app
              .db
              .Card
              .findOne({cardID: req.body.cardID})
              .exec(function (err, card) {
                if (err) {
                  done(err, null);
                } else {
                  if (req.body.creditAmmount >= 1){
                    var ammount = Number(req.body.creditAmmount);
                    card['cardCredit'] = card.cardCredit + ammount;
                    card.save(function (err) {
                      if (err) {
                        console.warn(err);
                      }else {
                        return res
                          .send({
                            success: true,
                            statusCode: 200,
                            message: 'Sucessfully Recharged',
                            data: {"Your new Balance is ":card.cardCredit}
                          });
                      }

                    });
                  } else {
                    return res.send({
                      code:501,
                      message:'Cannot a number less than One',
                      success:false,
                      data:null
                    })
                  }



                }
              })
          }

        ],

        function (err) {
          if (err) {
            return res.send({success: false, statusCode: 500, message: 'Internal Server Error', data: null});
          }
      });
  }
};