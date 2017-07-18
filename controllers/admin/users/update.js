const userModels = require('models').users;
const bcrypt = require('bcrypt-nodejs');
const validation = require('./validation.js');

module.exports = {
	newPassword: newPassword,
	editUser: editUser,
	resetPassword: resetPassword,
	dropActivity: dropActivity
};

function newPassword (req, res, next) {
	let values = [
		{	
			password: bcrypt.hashSync(req.body.password, null, null),
			firstLogin: true
		},
		req.body.id
	];
	userModels.update(values, function (err, result) {
		if (err) return res.status(500).json(err)
			res.status(200).json(result);
	});
}

function editUser (req, res, next) {
	let values = [
		{
      username: req.body.username,
      password: req.body.password,
      firstLogin: false,
      email: req.body.email,
      readContent: req.body.readContent,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      group_permission:req.body.group_permission,
      data_nascimento: req.body.data_nascimento,
      data_entrada: req.body.data_entrada,
      foto: req.body.data_nascimento,
      carta_conducao: req.body.carta_conducao,
      cartao_nos: req.body.carta_nos,
      comments: req.body.comments,
      state: req.body.state,
      phonenumber: req.body.phonenumber,
      required: req.body.required,
			firstLogin: true
		},
		req.body.id
	];
	let paramsValidation = validation(values[0], 'insertSchema');
	if (paramsValidation.error) {
		return res.status(400).json({error: paramsValidation.error});
	}
	
	userModels.update(values, function (err, result){
		if (err) return res.status(500).json(err);
		res.status(200).json(result);
	});
}

function resetPassword (req, res, next) {
	let values = [
		{
			password: bcrypt.hashSync('password', null, null),
			firstLogin: true
		},
		req.body.id
	];

	userModels.update(values, function (err, result) {
		if (err) return res.status(500).json(err);
		res.status(200).json(result);
	});
}

function dropActivity (req, res, next) {
	let values = [
		{
			state: 'inactive'
		},
		req.body.id
	];

	userModels.update(values, function (err, result) {
		if (err) return res.status(500).json(err);
		res.status(200).json(result);
	});
}
