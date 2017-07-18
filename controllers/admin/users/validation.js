const joi = require('joi');
const schema = {
	insertSchema: joi.object({
	  username: joi.string().trim().max(50),
	  firstLogin: joi.string().trim(),
	  email: joi.string().email(),
	  readContent: joi.string().trim(),
	  firstName: joi.string().trim().min(3).max(50),
	  lastName: joi.string().trim().min(3).max(50),
	  group_permission: joi.string().trim().min(3).max(50),
	  data_nascimento: joi.date().raw().allow('').allow(null),
	  data_entrada: joi.date().raw().allow('').allow(null),
	  foto: joi.string().allow('').allow(null),
	  carta_conducao: joi.string().max(50).allow('').allow(null),
	  cartao_nos: joi.string().max(50).allow('').allow(null),
	  comments: joi.string().max(200).allow('').allow(null),
	  state: joi.string().max(50),
	  phonenumber: joi.number(),
	  required: joi.string().max(50)
	}),
	searchByNameSchema:joi.string().trim().max(50).regex(/(?!^[0-9]*$)^([a-z]{6,50})$/)
	
};

module.exports = function (obj, chosenSchema) {
return joi.validate(obj, schema[chosenSchema]);
}
