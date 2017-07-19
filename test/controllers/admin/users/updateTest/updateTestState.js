const assert = require('chai').assert;
const helpers = require('../../../../helpers')
const supertest = require('supertest');
const connection = supertest(helpers.app);
const database = helpers.database;
const tableQuerys = require('../');
const bcrypt = require('bcrypt-nodejs');


let tableQ = tableQuerys.createTable;
let insertUsers = tableQuerys.insertUsers;

function createTable (done) {
  database.query(null, tableQ, done)
}

describe('#Testing update.js from users', function() {
  describe('#Update state', function () {
    describe('With errors and without db', function () {
      it('it should return error 500 when there is no db connection', function(done) {
      let id = 1;
      connection
        .put(`/users/state/${id}`)
        .send('active')
        .end(function (err, res) {
           assert.isNotOk(err);
           assert.equal(res.statusCode, 500);
           assert.isOk(res.body);
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
            database.query(null, query,insertUsers[1], done);
          });
        });
      });  

      after(function (done) {
        database.close(function() {
          done();
        });
      });

      it('It should update the user state', function(done) {
        connection
          .put('/users/state/1')
          .send('inactive')
          .end(function (err, res) {
            assert.isNotOk(err);
            assert.equal(res.statusCode, 200);
            assert.isOk(res.body);
            assert.equal(res.body.affectedRows, 1)
            done();
          });
      });
    }); 
  });
});
