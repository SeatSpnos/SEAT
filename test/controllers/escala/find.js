const assert = require('chai').assert;
const supertest = require('supertest');
const helpers = require('../../auxiliary');
const app = helpers.app();
const request = supertest(app);
const login = helpers.login;

describe('#Testing escala controllers', function () {
  describe('#Testing escala-find.js', function () {
		it('it should return the scales', function (done) {
			request
				.get(`/escala`)
				.end(function (err, res) {
					assert.isNotOk(err);
					assert.equal(res.statusCode, 200);
					assert.isOk(res.body);
					done();
				});
		});
		it('It should return the scales searched by date', function(done) {
			request
			.get('/escala/2017-03-22')
			.end(function (err, res) {
				assert.isNotOk(err);
				assert.equal(res.statusCode, 200);
				assert.isOk(res.body);
				done();
			});
		});
	});
});
