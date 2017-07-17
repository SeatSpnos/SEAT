const assert = require('chai').assert;
const helpers = require('../../../../helpers')
const supertest = require('supertest');
const connection = supertest(helpers.app);
const tableQuerys = require('../');
const database = helpers.db;

let tableQ = tableQuerys.createTable;
let insertUsers = tableQuerys.insertUsers;

function createTable (done) {
  database.query(null, tableQ, [] , done)
}

describe('#Testing find.js from users', function() {
  describe('#byId', function () {
    describe('With error no db', function () {
      it('it should return an error when a invalid param are provided', function(done) {
        let id = 'p';
        connection
          .get(`/users/${id}`)
          .end(function (err, res) {
            assert.isNotOk(err);
            assert.equal(res.statusCode, 400);
            assert.typeOf(res.body.error, 'string');
            done();
          });
      });

      it('it should return an error 500 when there is no connection to db ', function(done) {
        let id = 1;
        connection
          .get(`/users/${id}`)
          .end(function (err, res) {
            assert.isNotOk(err);
            assert.equal(res.statusCode, 500);
            assert.isOk(res.body);
            done();
          });
      });
    });
    describe('With error and db', function () {
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
        let id = 1;
        connection
          .get(`/users/${id}`)
          .end(function (err, res) {
            assert.isNotOk(err);
            assert.equal(res.statusCode, 404);
            assert.isOk(res.body)
            assert.typeOf(res.body, 'string');
            done();
          });
      });
    });

    describe('Without errors', function () {
      before(function (done) {
        let query = 
          `INSERT INTO users
          SET ?
          `;
        database.start(function() {
          createTable(function (err, res) {
            database.query(null, query, insertUsers[0], done);
          });
        });
      });  

      after(function (done) {
        database.close(function() {
          done();
        });
      });

      it('it should return a user with the given id from db', function(done) {
        let id = 1;
        connection
          .get(`/users/${id}`)
          .end(function (err, res) {
            assert.isNotOk(err);
            assert.equal(res.statusCode, 200);
            assert.isOk(res.body);
            assert.equal(res.body.length, 1);
            assert.ownInclude(res.body[0], insertUsers[0])
            done();
          });
      });
    });
  });
});
