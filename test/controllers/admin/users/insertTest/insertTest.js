const assert = require('chai').assert;
const helpers = require('../../../../helpers')
const supertest = require('supertest');
const tableQuerys = require('../');
const database = helpers.database;

let tableQ = tableQuerys.createTable;
let insertUsers = tableQuerys.insertUsers;

function createTable (done) {
  database.query(null, tableQ, [] , done)
}

describe('#Testing insert.js from users', function() {
  describe('With errors and no db', function() {
    const connection = supertest(helpers.app);
    it('it should return an error 500 when there is no connection to db', function(done) {
      connection
        .post('/users')
        .send(insertUsers[0])
        .end(function(err, res) {
          assert.isNotOk(err);
          assert.equal(res.statusCode, 500);
          assert.isOk(res.body);
          done();
        });
    }); 
  });

  describe('Without errors with db', function() {
    const connection = supertest(helpers.app);
    before(function (done) {

      let query = 
      `INSERT INTO users
      SET ?
      `;

      database.start(function() {
        createTable(function (err, res) {
          database.query(null, query, insertUsers[0], done)
        });
      });
    });  

    after(function (done) {
      database.close(function() {
        done();
      });
    });

    it('It should insert a new user into db', function(done) {
      connection
        .post('/users')
        .end(function(err, res) {
          assert.isNotOk(err)
          assert.equal(res.statusCode, 200)
          assert.isOk(res.body)
          assert.equal(res.body.insertId, 2)
          done();
        });
    });
  });
});