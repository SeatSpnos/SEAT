const joi = require('joi');
const schema = {
	insertSchema: joi.object.keys({
	  username: joi.string().trim().max(50),
	  password: joi.string().trim().alphanum().min(1).max(200),
	  firstLogin: joi.string().trim(),
	  email: joi.string().email(),
	  readContent: joi.string().trim(),
	  firstName: joi.string().trim().min(3).max(50),
	  lastName: joi.string().trim().min(3).max(50),
	  group_permission: joi.string().trim().min(3).max(50),
	  data_nascimento: joi.date().raw().allow(null),
	  data_entrada: joi.date().raw().allow(null),
	  foto: joi.string().allow(null),
	  carta_conducao: joi.string().max(50).allow(null),
	  cartao_nos: joi.string().max(50).allow(null),
	  comments: joi.string().max(200).allow(null),
	  state: joi.string().max(50),
	  phonenumber: joi.number(),
	  required: joi.string().max(50)
	})
};

module.exports = function (obj, chosenSchema) {
return joi.validate(obj, schema[chosenSchema]);
}
