'use strict'
const chai = require('chai');
const expect = chai.expect;
const Assert = chai.assert;
const sinon = require('sinon');
const supertest = require('supertest');
const api = supertest('http://localhost:3000');


describe('issueACard', () => {
  describe('issueACard test endpoints should be return with 200', () => {
    it('should response with success object', (done) => {
        let app = {
            api:{
                oc:{
                }
            }
        };
        let expectedResult = {
            "success": true,
            "statusCode": 200,
            "message": "Successfully Created",
            "data": {
                "__v": 0,
                "cardCredit": 33,
                "cardActiveStatus": true,
                "cardOwner": "5a13508b18ee596433d00870",
                "_id": "5a13508b18ee596433d00871",
                "cardID": "ALPHA"
            }
        };
        let url = "/api.oc.issueCard";
        let requestData = {
            "firstName":"Kamal",
            "lastName":"Hussain",
            "govermentID":"AplhaBravoCharle11",
            "email":"kamal@hybridlogicsolutions.com",
            "cardActiveStatus":true,
            "cardCredit":33,
            "cardID":123456
        };
        api.post(url)
        .set('Accept', 'application/json')
        .send(requestData)
        .expect(200)
        .end(function (err, res) {
          if (err) {
            return done(err);
          }
          if(res.body.statusCode == 200) {
            Assert.equal(res.body.statusCode, expectedResult.statusCode, "Status code is not same");
            Assert.equal(res.body.data.cardCredit, expectedResult.data.cardCredit, "Credit car not matched");
            Assert.equal(res.body.data.govermentID, expectedResult.data.govermentID, "govermentID  not matched");
            Assert.equal(res.body.data.cardActiveStatus, expectedResult.data.cardActiveStatus, "cardActiveStatus should be true");
            Assert.equal(res.body.data.cardCredit, expectedResult.data.cardCredit, "Credit car not matched");
          } else if (res.body.statusCode == 403){
            //TODO:More Test cases will be added here.
          }
          done();
        });
    });


    it('should response with 400 error object', (done) => {
     
        let expectedResult = {
            code: 400,
            message: 'Please Send firstName',
            success: false
        };
        let url = "/api.oc.issueCard";
        let requestData = {
            //"firstName":"Kamal",
            "lastName":"Hussain",
            "govermentID":"AplhaBravoCharle11",
            "email":"kamal@hybridlogicsolutions.com",
            "cardActiveStatus":true,
            "cardCredit":33,
            "cardID":123456
        };
        api.post(url)
        .set('Accept', 'application/json')
        .send(requestData)
        .expect(400)
        .end(function (err, res) {
          if (err) {
            return done(err);
          }
          console.log(res.body);
          Assert.deepEqual(res.body, expectedResult, " Expected Result Not Matched");
          Assert.equal(res.body.code ,400 ,"Status code Not Matched");
          done();
        });
    });
  });
})