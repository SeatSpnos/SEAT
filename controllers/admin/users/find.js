const userModels = require('models').users;

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
	userModels.find.byId(id, function(err, users) {
		if (err) return res.status(500).json(err);
		if (!users.length) return res.status(404).json('User was not found.');
		res.status(200).json(users);
	});
}

function byUsername(req, res, next) {
	let username = req.params.username;
	let userAsString = String(username);
	if (id != userAsString) {
		let err = `Invalid type of id. Id is a ${typeof id } when it should be a String`
		return res.status(400).json({error: err});
	}	
	userModels.byUsername(username, function(err, users) {
		if (err) return res.status(500).json(err);
		if (!username.length) return res.status(404).json('User was not found.');
		res.status(200).json(users);
	});
}