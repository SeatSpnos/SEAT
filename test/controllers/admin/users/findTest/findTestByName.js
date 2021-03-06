const assert = require('chai').assert;
const helpers = require('../../../../helpers')
const supertest = require('supertest');
const joi = require('joi');
const connection = supertest(helpers.app);
const tableQuerys = require('../');
const database = helpers.database;

let tableQ = tableQuerys.createTable;
let insertUsers = tableQuerys.insertUsers;

function createTable (done) {
  database.query(null, tableQ, done)
}

describe('#Testing find.js from users', function() {
  describe('#ByName', function() {
    describe('With error and no db', function() {
      it('it should return an error 500 when there is no connection to db', function(done) {
        connection
        .get(`/users/byUsername/username`)
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
      
      it('it should return an error 400 when a invalid param are provided', function(done) {
        let username = 'user@';
        connection
          .get(`/users/byUsername/${username}`)
          .end(function(err, res) {
            assert.isNotOk(err);
            assert.equal(res.statusCode, 400);
            assert.typeOf(res.body.error, 'string');
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
        let query2 = 
        `SELECT * FROM users
        WHERE 
          username = ?
        `;
        database.start(function() {
          createTable(function (err, res) {
            database.query(null, query, insertUsers, function() {
              database.query(null, query2, 'alipio', done)
            })
          });
        });
      });

      after(function (done) {
        database.close(function (err, res) {
          done();
        });
      });

      it('it should return error 404 if request not found', function (done) {
        let username = 'alipio';
        connection
          .get(`/users/byUsername/${username}`)
          .end(function(err, res) {
            assert.isNotOk(err);
            assert.equal(res.statusCode, 404);
            assert.isOk(res.body)
            assert.typeOf(res.body, 'string');
            done();
          });
      });

      it('it should return the user searched by username', function(done) {
        let username = 'gaspar';
        connection
          .get(`/users/byUsername/${username}`)
          .end(function(err, res) {
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
  