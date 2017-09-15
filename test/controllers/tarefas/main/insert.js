const assert = require('chai').assert;
const supertest = require('supertest');
const helpers = require('../../../auxiliary');
const db = helpers.db;
const app = helpers.app();
const request = supertest(app);
describe('#Testing tarefas-main-controllers', function () {
  describe('#Testing tarefas-main-insert.js -> one', function () {
    after(function (done) {
      db('seat', 'delete from tasks_users where userFK = 5', null, done);
    });
    it('it should insert a new Task', function (done) {
      let insertTestobj = {
        dateBegin: '2017-08-29 12:00:00',
        repeat: 0,
        until: 0,
        duracao: 0,
        taskValue: 1,
        userFK: 5
      };
      request
      .post(`/tarefas/main`)
      .send(insertTestobj)
      .end(function (err, res) {
        assert.isNotOk(err);
        assert.equal(res.statusCode, 200);
        assert.equal(res.body.affectedRows, 1);
        assert.isOk(res.body);
        done();
      });
    });
    it('it should update an old Task', function (done) {
      let updateTestobj = {
        dateBegin: '2017-08-29 12:00:00',
        repeat: 0,
        until: 0,
        duracao: 0,
        taskValue: 5,
        userFK: 5
      };
      request
        .post(`/tarefas/main`)
        .send(updateTestobj)
        .end(function (err, res) {
          assert.isNotOk(err);
          assert.equal(res.statusCode, 200);
          assert.equal(res.body.affectedRows, 2);
          assert.isOk(res.body);
          done();
        });
    });
  });
});
