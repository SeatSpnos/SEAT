const userModels = require('models').users;

module.exports = {
	editUser: editUser,
	newPassword: newPassword,
	resetPassword: resetPassword,
	readContent: readContent
};


function editUser (req, res, next) {
	let id = req.params.id;
	let user = req.body.user;
	userModels.update.editUser(id, user, function (err, result){
		if (err) return res.status(500).json(err);
		res.status(200).json(result);
	});
}

function newPassword (req, res, next) {
	let id = req.params.id;
	let newPassword = req.body.newPassword;

	userModels.update.newPassword(id, newPassword, function (err, result) {
		if (err) return res.status(500).json(err);
		res.status(200).json(result);
	});
}

function resetPassword (req, res, next) {
	let id = req.params.id;
	userModels.update.resetPassword(id, function (err, result) {
		if (err) return res.status(500).json(err);
		res.status(200).json(result);
	});
}

function readContent (req, res, next) {
	let id = req.params.id;
	let value = req.body.readContent;

	userModels.update.readContent(id, value, function (err, result) {
		if (err) return res.status(500).json(err);
		res.status(200).json(result);
	});
}
