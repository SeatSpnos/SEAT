const userModels = require('models').users;
const bcrypt = require('bcrypt-nodejs');
const validation = require('./validation.js');

module.exports = function (req, res, next) {
	console.log(req.body)
	let paramsValidation = validation(req.body, 'insertSchema');
	console.log(`Validação : ${JSON.stringify(paramsValidation)}`)
	if (paramsValidation.error) {
		console.log(paramsValidation.error);
		//let err = `Invalid type of id. Id is a ${typeof username } when it should be a String`
		return res.status(400).json({error: paramsValidation.error});
	}
	req.body.password = bcrypt.hashSync(req.body.password);

 	userModels.insert(req.body, function (err, result) {
 		if (err) return res.status(500).json(err);
 		res.status(200).redirect('/users');
 	});
}
