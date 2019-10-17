'use strict'
const chai = require('chai');
const expect = chai.expect;
const assert = chai.assert;
const sinon = require('sinon');
const supertest = require('supertest');
const app = require('../app');
const api = supertest('http://localhost:3000');
const mongoose = function(){
    console.log("Manhoose");
};

describe('issueACard unit', () => {

    it('Should Test Controllers issueCard', function (done){
        let reqStub = {
            body : {
                "firstName":"Kamal",
                "lastName":"Hussain",
                "govermentID":"AplhaBravoCharle11",
                "email":"kamal@hybridlogicsolutions.com",
                "cardActiveStatus":true,
                "cardCredit":33,
                "cardID":123456
            }
        }
        let expectedResult = {
            "success": true,
            "statusCode": 200,
            "message": "Successfully Created",
            "data": {
                "__v": 0,
                "cardCredit": 33,
                "cardActiveStatus": true,
                "cardOwner": "5a1353e0d45fbed3355639cb",
                "_id": "5a1353e0d45fbed3355639cc",
                "cardID": "ALPHA"
            }
        };
        let nextSpy = sinon.spy();
        let headerSpy = sinon.spy();
        let resSpy = sinon.spy(function (result) {
            console.log(result);
            if(result.statusCode == 200){

                assert.equal(result.statusCode, expectedResult.statusCode||403, 'Expected status code 200');
          assert.equal(result.message, expectedResult.message , "Message donot Matched");
          assert.equal(result.data.cardCredit, expectedResult.data.cardCredit, "Credit car not matched");
          assert.equal(result.data.cardActiveStatus, expectedResult.data.cardActiveStatus, "cardActiveStatus should be true");
          assert.equal(result.data.cardCredit, expectedResult.data.cardCredit, "Credit car not matched");
          expect(headerSpy.callCount).to.be.equal(0, 'Expected 1 count of set header function');
          expect(nextSpy.callCount).to.be.equal(0, 'Expected 0 count of nextSpy');
            }
          done();
        });
        let res = {
          send:resSpy,
          status:sinon.spy()
        };

        app.api.oc.issueCard(reqStub,res,nextSpy);
        
  
        
    });
});