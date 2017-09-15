const assert = require('chai').assert;
const supertest = require('supertest');
const helpers = require('../../../auxiliary');
const app = helpers.app();
const request = supertest(app);

describe('#Testing escala-main controllers', function () {
  describe('#Testing escala-main find.js', function () {
		it('it should return the scales of the current month', function (done) {
			request
				.get(`/escala/main`)
				.end(function (err, res) {
					assert.isNotOk(err);
					assert.equal(res.statusCode, 200);
					assert.isOk(res.body);
					done();
				});
		});
		it('It should return the scales searched by date 1 month interval', function(done) {
			request
			.get('/escala/main/2017-03-22')
			.end(function (err, res) {
				assert.isNotOk(err);
				assert.equal(res.statusCode, 200);
				assert.isOk(res.body);
				done();
			});
		});
	});
});
