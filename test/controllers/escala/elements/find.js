const assert = require('chai').assert;
const supertest = require('supertest');
const helpers = require('../../../auxiliary');
const app = helpers.app();
const request = supertest(app);

describe('#Testing escala-elements controllers', function () {
  describe('#Testing escala-elements find.js', function () {
		it('it should return the scales', function (done) {
			request
				.get(`/escala/elements/all`)
				.end(function (err, res) {
					assert.isNotOk(err);
					assert.equal(res.statusCode, 200);
					assert.isOk(res.body);
					done();
				});
		});
	});
});
