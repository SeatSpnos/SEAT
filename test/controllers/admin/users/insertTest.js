const assert = require('chai').assert;
const helpers = require('../../../helpers')
const supertest = require('supertest');
const connection = supertest(helpers.app);
const tableQuerys = require('./');
const database = helpers.db;

let tableQ = tableQuerys.createTable;
let insertUsers = tableQuerys.insertUsers;

function createTable (done) {
  database.query(null, tableQ, [] , done)
}

describe('#Testing insert.js from users', function(err, res) {
  describe('With errors and no db', function(err, res) {
    it('it should return an error 500 when there is no connection to db', function(done) {
      connection
        .post('/')
        .end(function(err, res) {
          assert.isNotOk(err);
          assert.equal(res.statusCode, 500);
          assert.isOk(res.body);
          done();
        });
    }); 
  });

  describe('Without errors with db', function(err, res) {
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
    });

    it('It should insert a new user into db', function(done) {
      connection
        .post('/')
        .type('json')
        .send({     
          username: 'Oscarie',
          email: 'Oscar@gmail.com',
          firstName: 'Oscar',
          lastName: 'Matus',
          group_permission: 'dev',
          data_nascimento: '1990-10-22',
          data_entrada: null,
          foto: null,
          carta_conducao: null,
          cartao_nos: null,
          phonenumber: 215556484
        })
        .end(function(err, res) {
          assert.isNotOk(err)
          assert.equal(res.statusCode, 200)
          assert.isOk(res.body)
          done();
        });
    });
    it ('test', function (argument) {
      joiValidation = require('../../../../controllers').admin.users.joiValidation;

      let obj1 = {
          username: 'Oscarie',
          email: 'Oscar@gmail.com',
          firstName: 'Oscar',
          lastName: 'Matus',
          group_permission: 'dev',
          data_nascimento: '1990-10-22',
          data_entrada: null,
          foto: null,
          carta_conducao: null,
          cartao_nos: null,
          phonenumber: 215556484
      };

      joiValidation(obj1);

    });
  });
});