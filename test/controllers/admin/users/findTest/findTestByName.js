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
  describe('#ByName', function() {
    describe('With error and no db', function() {
      it('it should return an error 500 when there is no connection to db', function(done) {
        connection
        .get(`/users/:username`)
        .end(function (err, res) {
          assert.isNotOk(err);
          assert.equal(res.statusCode, 500);
          assert.isOk(res.body);
          done();
        });
      });
    });

    describe('With error and db', function() {
      before(function (done) {
        let query = 
          `INSERT INTO users
          SET ?
          `;
        database.start(function() {
          createTable(function (err, res) {
            database.query(null, query, insertUsers, done);
          });
        });
      });

      after(function (done) {
        database.close(function (err, res) {
          done();
        });
      });
      
      it('It should return error 404 if request not found', function(done) {
        let username = 1;
        connection
          .get(`/users/${username}`)
          .end(function(err, res) {
            assert.isNotOk(err);
            assert.equal(res.statusCode, 404);
            assert.isOk(res.body)
            assert.typeOf(res.body, 'string');
            done();
          });
      });
    });
    describe('Without errors with db', function() {
      before(function (done) {
        let query = 
          `INSERT INTO users
          SET ?
          `;
        database.start(function() {
          createTable(function (err, res) {
            database.query(null, query, insertUsers, done);
          });
        });
      });

      after(function (done) {
        database.close(function (err, res) {
          done();
        });
      });

      it('it should return the user searched by username', function(done) {
        let username = 'Gaspar';
        connection
          .get(`/users/${username}`)
          .end(function(err, res) {
            assert.isNotOk(err);
            assert.equal(res.statusCode, 200);
            assert.isOk(res.body);
            assert.equal(res.body.length, 1);
            assert.ownInclude(res.body[0], insertedValues)
            done();
          });
      });
    });
  });
});
  