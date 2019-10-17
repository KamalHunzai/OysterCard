"use strict";
exports = module.exports = function (app,mongoose) {

  var Schema = mongoose.Schema;
  var card = new Schema({
    cardID:{
      type:String,
      default:"ALPHA"
    },
    cardCredit:Number,
    cardActiveStatus:Boolean,
    cardOwner:{
      type: Schema.Types.ObjectId,
    ref: 'User'
    }
  },{timestamp:true});
  var card = mongoose.model("Card",card);
  app.db.Card = card
};
