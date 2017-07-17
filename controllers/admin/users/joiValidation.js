const Joi = require('joi');

const schema = Joi.object({
  username: Joi.string().trim().max(50),
  password: Joi.string().trim().alphanum().min(1).max(200),
  firstLogin: Joi.string().trim(),
  email: Joi.string().regex(/^[a-z]+$/, '@'),
  readContent: Joi.string().trim(),
  firstName: Joi.string().trim().min(3).max(50),
  lastName: Joi.string().trim().min(3).max(50),
  group_permission: Joi.string().trim().min(3).max(50),
  data_nascimento: Joi.date().timestamp().raw(),
  data_entrada: Joi.date().timestamp().raw(),
  foto: Joi.string(),
  carta_conducao: Joi.string().max(50),
  cartao_nos: Joi.string().max(50),
  comments: Joi.string().max(200),
  state: Joi.string().max(50),
  phonenumber: Joi.number(),
  required: Joi.string().max(50)
});

module.exports = function(obj) {
  var err = Joi.validate(obj, schema, function() {
  	console.log(err ? err : 'Valid!');
  });
}
