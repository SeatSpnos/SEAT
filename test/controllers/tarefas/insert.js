const assert = require('chai').assert;
const supertest = require('supertest');
const helpers = require('../../auxiliary');
const app = helpers.app();
const request = supertest(app);
const randomStr = require('randomstring');

describe('#Testing tarefas controllers', function () {
  describe('#Testing tarefas-insert.js', function () {
    after(function (done) {
      helpers.db('seat', 'delete from tarefas where userFK = 9;', done);
    });
    it('it should insert a new Task', function (done) {
      let insertTestobj = {
        horaInicio: '12:00:00',
        repeat: 0,
        duracao: 1,
        tarefa: 'tarefaTeste',
        userFK: 9
      };
      request
      .post(`/tarefas`)
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
        tarefaID: 110,
        horaInicio: '12:00:00',
        repeat: 0,
        duracao: 0,
        tarefa: randomStr.generate(3),
        userFK: 30
      };
      request
        .post(`/tarefas`)
        .send(updateTestobj)
        .end(function (err, res) {
          assert.isNotOk(err);
          assert.equal(res.statusCode, 200);
          assert.equal(res.body.affectedRows, 1);
          assert.isOk(res.body);
          done();
        });
    });
  });
});
