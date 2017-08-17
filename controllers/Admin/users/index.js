// var colum = ['Utilizador', 'Primeiro nome', 'Ultimo nome', 'Grupo', 'Estado', 'Password'];
// var colAll = ['Utilizador', 'Email', 'Primeiro nome', 'Ultimo nome', 'Grupo', 'Data de Nascimento', 'Data de Entrada', 'Foto', 'Carta de Condução', 'Numero cartão NOS', 'Observações', 'Estádo'];
const FindUser = require('./find');
const RemoveUser = require('./remove');
const UpdateUser = require('./update');
const CreateUser = require('./create');
const ResetPassword = require('./reset');
const model = require('models');

module.exports = {
  find: find,
  create: create,
  update: update,
  remove: remove,
  add: addForm,
  edit: editForm,
  reset: reset
};

function find (req, res, next) {
  FindUser.all(req, res, next);
}

function addForm (req, res, next) {
  model.group.all(function (err, data) {
    if (err) next(err);
    res.render('partials/new_user', { group: data });
  });
}

function remove (req, res, next) {
  RemoveUser(req.params, res, next);
}

function editForm (req, res, next) {
  FindUser.id(req.body, res, next);
}

function update (req, res, next) {
  UpdateUser(req, res, function (err, data) {
    if (err) next(err);
    res.redirect('/user');
  });
}

function create (req, res, next) {
  CreateUser(req.body, res, function (err, data) {
    if (err) next(err);
    res.redirect('/user');
  });
}

function reset (req, res, next) {
  ResetPassword(req.body, res, next);
}
