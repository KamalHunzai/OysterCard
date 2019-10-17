"use strict";
exports = module.exports = function (app,mongoose) {

  var Schema = mongoose.Schema;
  var user = new Schema({
    email: String,
    userSignUpDate: String,
    firstName: String,
    lastName: String,
    phone:String,
    govermentID: String
  },{timestamp:true});

  var user = mongoose.model("User",user);
  app.db.User = user;
}