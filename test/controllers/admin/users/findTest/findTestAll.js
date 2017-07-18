const assert = require('chai').assert;
const helpers = require('../../../../helpers')
const supertest = require('supertest');
const connection = supertest(helpers.app);
const tableQuerys = require('../');
const database = helpers.database;

let tableQ = tableQuerys.createTable;
let insertUsers = tableQuerys.insertUsers;

function createTable (done) {
  database.query(null, tableQ, [] , done)
}

describe('#Testing find.js from users', function() {
  describe('#All users', function () {
    describe('With errors no db', function () {
      it('it should return an error 500 when there is no connection to db ', function(done) {
      connection
        .get('/users')
        .end(function (err, res) {
           assert.isNotOk(err);
           assert.equal(res.statusCode, 500);
           assert.isOk(res.body);
           done();
        });
      });
    describe('With errors and db', function () {
      before(function (done) {
        database.start(function (err, res) {
          createTable(done);
        });
      });

      after(function (done) {
        database.close(function (err, res) {
          done();
        });
      });

      it('It should return an 404 error if request not found', function(done) {
        connection
          .get('/users')
          .end(function(err, res) {
            assert.isNotOk(err);
            assert.equal(res.statusCode, 404);
            assert.isOk(res.body);
            assert.typeOf(res.body, 'string');
            done();
          });
        });
      });
    });
    
    describe('Without errors and db', function () {
      before(function (done) {
         let query = 
          `INSERT INTO users
          SET ?
          `;
        database.start(function() {
          createTable(function (err, res) {
            database.query(null, query, insertUsers[0], function() {
              database.query(null, query, insertUsers[1], done);
            });
          });
        });
      });  

      after(function (done) {
        database.close(function() {
          done();
        });
      })
      it('it should return all users from db', function(done) {
        connection
          .get(`/users`)
          .end(function (err, res) {
            assert.isOk(res);
            assert.equal(res.statusCode, 200);
            assert.isOk(res.body);
            assert.equal(res.body.length, 2);
            assert.ownInclude(res.body[1], insertUsers[1]);
            assert.ownInclude(res.body[0], insertUsers[0]);
            done();
          });
      });
    });
  });
});
