const model = require('models').user;

module.exports = function (req, res, next) {
  let tomodel = {
    id: req.body.id,
    username: req.body.username,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    data_nascimento: req.body['Data Nascimento'],
    data_entrada: req.body['Data Entrada'],
    foto: req.body.picture,
    phonenumber: req.body.cellnumber,
    carta_conducao: req.body.driverslicence,
    cartao_nos: req.body.noscard,
    comments: req.body.obs,
    state: req.body.state,
    group: req.body.group
  };

  model.update(tomodel, function (err, rows) {
    if (err) next(err);
    next(null, rows);
  });
};
