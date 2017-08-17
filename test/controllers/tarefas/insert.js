const assert = require('chai').assert;
const supertest = require('supertest');
const helpers = require('../../auxiliary');
const app = helpers.app();
const request = supertest(app);
const randomStr = require('randomstring');

describe('#Testing tarefas controllers', function () {
  describe('#Testing tarefas-insert.js', function () {
    it('it should insert a new Task', function (done) {
      let insertTestobj = {
        tarefaID: 10,
        horaInicio: '12:00:00',
        repeat: 0,
        until: '2017/08/17',
        duracao: 1,
        tarefa: 'tarefaTeste',
        userFK: 31
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
      let insertTestobj = {
        tarefaID: 86,
        horaInicio: '12:00:00',
        repeat: 0,
        until: '2017/08/17',
        duracao: 0,
        tarefa: randomStr.generate(3),
        userFK: 30
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
  });
});
