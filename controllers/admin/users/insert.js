const userModels = require('models').users;
const bcrypt = require('bcrypt-nodejs');

module.exports = function (req, res, next) {
	req.body.password = bcrypt.hashSync(req.body.password);
 	
 	userModels.insert(req.body, function (err, result) {
 		if (err) return res.status(500).json(err);
 		res.status(200).redirect('/users');
 	});
}
