const assert = require('chai').assert;
const supertest = require('supertest');
const helpers = require('../../auxiliary');
const db = helpers.db;
const app = helpers.app();
const request = supertest(app);

describe('#Testing escala-insert', function () {
  describe('#Testing escala-insert-one', function () {
    it('it should insert one scale', function (done) {
      let scale = {user_FK_iD: 35, date: '2017-05-01', value: 'H1'};
      request
        .post(`/escala/one/`)
        .send(scale)
        .end(function (err, res) {
          assert.isNotOk(err);
          assert.equal(res.statusCode, 200);
          assert.equal(res.body.affectedRows, 1);
          assert.isOk(res.body);
          done();
        });
    });
  });
  describe('#Testing escala-insert-bulk', function () {
    it('It should bulk insert scales', function (done) {
      let scale = {
        dateBegin: '2017-05-05',
        dateEnd: '2017-05-10',
        user_FK_ID: 10,
        value: 'H1'
      };
      request
        .post(`/escala/bulk`)
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
