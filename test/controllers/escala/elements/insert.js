const assert = require('chai').assert;
const supertest = require('supertest');
const helpers = require('../../../auxiliary');
const db = helpers.db;
const app = helpers.app();
const request = supertest(app);
let lastInsertedID = 0;

describe('#Testing escala-elements controllers', function () {
  describe('#Testing escala-elements insert.js', function () {
    after(function (done) {
      let sqlQuery =
      `SELECT id FROM scales_users
        WHERE id=(SELECT max(id) 
        FROM scales_users)`;
      db('seat', sqlQuery, null, function (err, rows) {
        if (err) return console.log(err);
        lastInsertedID = rows[0].id;
        db('seat', `delete from scales_users where id = ${lastInsertedID}`, null, done);
      });
    });

    it('it should insert a scale', function (done) {
      let scale = {
        name: 'manha',
        alias: 'teste',
        group: 'testers',
        backgroundColor: '#EEE',
        fontColor: '#FFF'
      };
      request
				.post(`/escala/elements`)
				.send(scale)
				.end(function (err, res) {
  assert.isNotOk(err);
  assert.equal(res.statusCode, 200);
  assert.isOk(res.body);
  done();
});
    });
  });
});
