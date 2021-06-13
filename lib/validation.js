const Joi = require('@hapi/joi');

exports.registerValidation = (data) => {
	const schema = Joi.object(
		{
			username: Joi.string().required(),
			email: Joi.string().min(6).required().email(),
			password: Joi.string().min(6).required(),
		}
	)
	return schema.validate(data);
}

exports.loginValidation = (data) => {
	const schema = Joi.object(
		{
			email: Joi.string().min(6).required().email(),
			password: Joi.string().min(6).required(),
		}
	)
	return schema.validate(data);
}