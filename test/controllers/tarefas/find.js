const assert = require('chai').assert;
const supertest = require('supertest');
const helpers = require('../../auxiliary');
const app = helpers.app();
const request = supertest(app);

describe('#Testing tarefas controllers', function () {
  describe('#Testing tarefas-find.js', function () {
    it('it should return all the tasks by current date', function (done) {
      request
      .get(`/tarefas`)
      .end(function (err, res) {
        assert.isNotOk(err);
        assert.equal(res.statusCode, 200);
        assert.isOk(res.body);
        done();
      });
    });
    it('It should return the tasks searched by params date', function (done) {
      request
      .get('/tarefas/2017-08-18')
      .end(function (err, res) {
        assert.isNotOk(err);
        assert.equal(res.statusCode, 200);
        assert.isOk(res.body);
        done();
      });
    });
    it('It should return the all tasks (id and task)', function (done) {
      request
        .get('/tarefas/all')
        .end(function (err, res) {
          assert.isNotOk(err);
          assert.equal(res.statusCode, 200);
          assert.isOk(res.body);
          done();
        });
    });
    it('It should return data if a conflict is verified ', function (done) {
      request
        .post('/tarefas/verify')
        .send({userFK: 5, horaInicio: '09:00:00'})
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
        .post('/tarefas/verify')
        .send({userFK: 15, horaInicio: '09:00:00'})
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
