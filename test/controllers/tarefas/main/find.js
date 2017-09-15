const assert = require('chai').assert;
const supertest = require('supertest');
const helpers = require('../../../auxiliary');
const app = helpers.app();
const request = supertest(app);

describe('#Testing tarefas controllers', function () {
  describe('#Testing tarefas-find.js -> #allByDate', function () {
    it('it should return all tasked users by current date', function (done) {
      request
      .get(`/tarefas/main`)
      .end(function (err, res) {
        assert.isNotOk(err);
        assert.equal(res.statusCode, 200);
        assert.isOk(res.body);
        done();
      });
    });
    it('It should return the tasked_users searched by params date', function (done) {
      request
      .get('/tarefas/main/2017-08-18')
      .end(function (err, res) {
        assert.isNotOk(err);
        assert.equal(res.statusCode, 200);
        assert.isOk(res.body);
        done();
      });
    });
    it('It should return data if a conflict is verified ', function (done) {
      request
        .post('/tarefas/main/verify')
        .send({userFK: 35, horaInicio: '2017-08-29 09:00:00'})
        .end(function (err, res) {
          assert.isNotOk(err);
          assert.equal(res.statusCode, 200);
          assert.equal(res.body.length, 1);
          assert.isOk(res.body);
          done();
        });
    });
    it('It should return an empty array if there are no conflicts', function (done) {
      request
        .post('/tarefas/main/verify')
        .send({userFK: 35, horaInicio: '2017-08-30 09:00:00'})
        .end(function (err, res) {
          assert.isNotOk(err);
          assert.equal(res.statusCode, 200);
          assert.equal(res.body.length, 0);
          assert.isOk(res.body);
          done();
        });
    });
  });
});
