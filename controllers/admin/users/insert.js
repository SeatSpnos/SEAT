const userModels = require('models').users;
const bcrypt = require('bcrypt-nodejs');

module.exports = function (req, res, next) {
	
	 var newUser = {
    username: req.username,
    firstName: req.firstName,
    lastName: req.lastName,
    email: req.email,
    group_permission: req.group_permission,
    data_nascimento: req.data_nascimento,
    data_entrada: req.data_entrada,
    foto: req.foto,
    cartao_nos: req.cartao_nos,
    telefone: req.telefone,
    password: bcrypt.hashSync(req.password, null, null),
    state: true,
    firstLogin: true 	
  };

 	userModels.insert(newUser, function (err, result) {
 		if (err) console.log(err)
 			return res.status(500).json(err);
 		res.status(200).redirect('/users')(result);
 	});
}
