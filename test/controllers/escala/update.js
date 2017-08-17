const assert = require('chai').assert;
const supertest = require('supertest');
const helpers = require('../../auxiliary');
const db = helpers.db;
const app = helpers.app();
const request = supertest(app);
const login = helpers.login;
const randomStr = require('randomstring');

describe('#Testing escala-update', function () {
  describe('#Testing escala-update-one', function () {
    it('it should return status 400 if a bad param is requested', function (done) {
      let scale = {user_FK_iD: 35, date: '2017/05/01', value: 'H1'};
      request
        .put(`/escala/one/a`)
        .send(scale)
        .end(function (err, res) {
          assert.isNotOk(err);
          assert.equal(res.statusCode, 400);
          assert.isOk(res.body);
          done();
        });
    });
    it('it should return status 404 if ID not found on db', function (done) {
      let scale = {value: 'H1'};
      request
        .put(`/escala/one/1`)
        .send(scale)
        .end(function (err, res) {
          assert.isNotOk(err);
          assert.equal(res.statusCode, 404);
          assert.isOk(res.body);
          assert.typeOf(res.body, 'string');
          done();
        });
    });
    it('it should update scale value by id', function (done) {
      let value = {value: randomStr.generate(3)};
      request
        .put(`/escala/one/25`)
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

  describe('#Testing escala-update-bulk', function () {
    after(function (done) {
        let sql =
        `DELETE FROM escala
        WHERE user_FK_ID = ?`;
        db(null, sql, 35, done);
      });
    it('It should bulk update scale if already exists in db', function (done) {
      let scale = {
        dateBegin: '2017-05-01',
        dateEnd: '2017-05-10',
        user_FK_ID: 35,
        value: 'H10'
      };
      request
        .post(`/escala/bulk`)
        .send(scale)
        .end(function (err, res) {
          assert.isNotOk(err);
          assert.equal(res.statusCode, 200);
          assert.equal(res.body[0].affectedRows, 1);
          assert.isOk(res.body);
          done();
        });
    });
  });
});
