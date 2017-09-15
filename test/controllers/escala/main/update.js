const assert = require('chai').assert;
const supertest = require('supertest');
const helpers = require('../../../auxiliary');
const db = helpers.db;
const app = helpers.app();
const request = supertest(app);
let lastInsertedID = 0;

describe('#Testing escala-main update', function () {
  describe('#Testing escala-main update-one', function () {
    before(function (done) {
      let sqlQuery =
      `SELECT id FROM scales_users
        WHERE id=(SELECT max(id) 
        FROM scales_users)`;
      db('seat', sqlQuery, null, function (err, rows) {
        if (err) return console.log(err);
        lastInsertedID = rows[0].id;
        console.log('LASTID:', lastInsertedID);
      });
      done();
    });
    after(function (done) {
      db('seat', 'delete from scales_users where user_FK_ID = 35;', done);
    });
    it('it should return status 400 if a bad param is requested', function (done) {
      request
      .put(`/escala/main/one/a`)
      .end(function (err, res) {
        assert.isNotOk(err);
        assert.equal(res.statusCode, 400);
        assert.isOk(res.body);
        done();
      });
    });
    it('it should return status 404 if ID not found on db', function (done) {
      let scale = {value_FK_ID: 2};
      request
        .put(`/escala/main/one/2345`)
        .send(scale)
        .end(function (err, res) {
          assert.isNotOk(err);
          assert.equal(res.statusCode, 404);
          assert.isOk(res.body);
          assert.typeOf(res.body, 'string');
          done();
        });
    });
    it('It should update scale value by scale user ID', function (done) {
      let value = {value_FK_ID: 30};
      request
      .put(`/escala/main/one/${lastInsertedID}`)
      .send(value)
      .end(function (err, res) {
        assert.isNotOk(err);
        assert.equal(res.statusCode, 200);
        assert.equal(res.body.affectedRows, 1);
        assert.isOk(res.body);
        done();
      });
    });
  });
  describe('#Testing escala-main update-bulk', function () {
    after(function (done) {
      db('seat', 'delete from scales_users where user_FK_ID = 35;', done);
    });
    it('It should bulk update scale value if user already exists in db', function (done) {
      let scale = {
        dateBegin: '2017-05-05',
        dateEnd: '2017-05-10',
        user_FK_ID: 35,
        value_FK_ID: 21
      };
      request
      .post(`/escala/main/bulk`)
      .send(scale)
      .end(function (err, res) {
        assert.isNotOk(err);
        assert.equal(res.statusCode, 200);
        assert.equal(res.body.affectedRows, 6);
        assert.isOk(res.body);
        done();
      });
    });
  });
});
