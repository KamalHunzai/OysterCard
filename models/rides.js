"use strict";
exports = module.exports = function (app,mongoose) {

  var Schema = mongoose.Schema;
  var ride = new Schema({
    startingPoint:String,
    endingPoint:String,
    rideActive:Boolean,
    travelingByBus:Boolean,
    startingTime:{
      type:Date,
      default:Date.now()
    },
    card:{
      type: Schema.Types.ObjectId,
      ref: 'Card'
    }
  },{timestamp:true});
  var ride = mongoose.model("Ride",ride);
  app.db.Ride = ride;
};