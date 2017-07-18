const userModels = require('models').users;
const bcrypt = require('bcrypt-nodejs');
const validation = require('./validation.js');

module.exports = function (req, res, next) {
	let paramsValidation = validation(req.body, 'insertSchema');
	if (paramsValidation.error) {
		return res.status(400).json({error: paramsValidation.error});
	}
	req.body.password = bcrypt.hashSync('password', null, null);
 	userModels.insert(req.body, function (err, result) {
 		if (err) return res.status(500).json(err);
 		res.status(200).json(result);
 	});
}
