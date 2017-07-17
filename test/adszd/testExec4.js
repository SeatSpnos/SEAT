/*const assert = require('chai').assert;
const exec4 = require('../exec4.js');

describe('Test on exec4', function() {
  it('it should recive an array, and return an object with errors / res', function(done) {
	  let array = [0,1,2,3,4,5]
	  exec4(array, function (err, res) {
	  	assert.typeOf(res, 'object');
			assert.typeOf(res.arrayErrors, 'array');
			assert.typeOf(res.arrayResults, 'array');
			let totalArraylength = res.arrayErrors.length + res.arrayResults.length;
			assert.equal(totalArraylength, array.length);
			assert.equal(res.arrayErrors.length, 1);
			assert.equal(res.arrayResults.length, 5);
	  	done();
	  })
	});
});	*/