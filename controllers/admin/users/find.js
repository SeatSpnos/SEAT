const userModels = require('models').users;
const validation = require('./validation.js');

module.exports = {
	all: all,
	byId: byId,
	byUsername: byUsername

};

function all (req, res, next) {
	userModels.find.all(function (err, users) {
		if (err) return res.status(500).json(err);
		if (!users.length) return res.status(404).json('Database has no users');
		res.status(200).json(users);
	});
}

function byId (req, res, next) {
	let id = req.params.id;
	let idAsInt = +id;

	if (id != idAsInt) {
		let err = `Invalid type of id. Id is a ${typeof id } when it should be a number`
		return res.status(400).json({error: err});
	}	
	userModels.find.byId(id, function(err, user) {
		if (err) return res.status(500).json(err);
		if (!user.length) return res.status(404).json('User was not found.');
		res.status(200).json(user);
	});
}

function byUsername(req, res, next) {
	let username = req.params.username;
	let paramsValidation = validation(username, 'searchByNameSchema');
	if (paramsValidation.error) {
		let err = `Invalid type parameter. it's expected a 'username'`
		return res.status(400).json({error: err});
	}
	userModels.find.byUsername(username, function(err, user) {
		if (err) return res.status(500).json(err);
		if (!user.length) return res.status(404).json('User was not found.');
		res.status(200).json(user);
	});
}