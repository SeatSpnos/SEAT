const assert = require('chai').assert;
const supertest = require('supertest');
const helpers = require('../../../auxiliary');
const app = helpers.app();
const request = supertest(app);

describe('#Testing tarefas elements controllers', function () {
  describe('#Testing tarefas-elements-find.js -> all', function () {
    it('It should return the all tasks (id and task)', function (done) {
      request
        .get('/tarefas/elements/all')
        .end(function (err, res) {
          assert.isNotOk(err);
          assert.equal(res.statusCode, 200);
          assert.isOk(res.body);
          done();
        });
    });
  });
});
