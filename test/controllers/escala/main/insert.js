const assert = require('chai').assert;
const supertest = require('supertest');
const helpers = require('../../../auxiliary');
const app = helpers.app();
const request = supertest(app);

describe('#Testing escala-main insert', function () {
  describe('#Testing escala-main insert-one', function () {
    it('it should insert one scale', function (done) {
      let scale = {user_FK_ID: 35, date: '2016-12-01', value_FK_ID: 3};
      request
        .post(`/escala/main/one`)
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
  describe('#Testing escala-main insert-bulk', function () {
    it('It should bulk insert scales', function (done) {
      let scale = {
        dateBegin: '2017-05-05',
        dateEnd: '2017-05-10',
        user_FK_ID: 35,
        value_FK_ID: 1
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
