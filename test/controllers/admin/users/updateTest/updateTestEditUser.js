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
  describe('#Edit user', function () {
    describe('With errors and without db', function () {
      it('it should return error 500 when there is no db connection', function(done) {
      connection
        .put('/users')
        .send(insertUsers[0])
        .end(function (err, res) {
           assert.isNotOk(err);
           assert.equal(res.statusCode, 500);
           assert.isOk(res.body);
           done();
        });
      });
    });
    
    describe('With errors and db', function() {
      
      before(function (done) {
        let query = 
          `INSERT INTO users
          SET ?
          `;
        database.start(function() {
          createTable(function (err, res) {
            database.query(null, query,insertUsers[0], done);
          });
        });
      });  

      after(function (done) {
        database.close(function() {
          done();
        });
      });

       it('It should return error 404', function(done) {
        let values = {password: '123', id: 1};
        connection
          .put('/users')
          .send(insertUsers[1])
          .end(function (err, res) {
            assert.isNotOk(err);
            assert.equal(res.statusCode, 404);
            assert.isOk(res.body);
            assert.equal(res.body.affectedRows, 1)
            connection
              .get(`/users/byId/${values.id}`)
              .end(function(err, res) {
                assert.isOk(bcrypt.compareSync(values.password, res.body[0].password));
                done();
              });
          });
      }); 
    });
  });
});