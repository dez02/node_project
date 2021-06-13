const User = require('../models/authModel');
const bcrypt = require('bcryptjs');
const { registerValidation, loginValidation } = require('../lib/validation');
const createToken = require("../lib/auth").createToken;
const { response } = require('express');

/*
 |--------------------------------------------------------------------------
 |  REGISTER VALIDATION
 |--------------------------------------------------------------------------
*/
 exports.register = async (req, res) => {

	//Validate data before making a user
	const { error } = registerValidation(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	const { email, username } = req.body;

	//Checking if the user is already in the database
	const isEmail = await User.findOne({ email });
	if (isEmail) {
		return res.status(403).json({ success: false, message: "Email already exists!" })
	}
	// Hash password
	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(req.body.password, salt);

	//Create a new user
	const user = new User({ username, email, password: hashedPassword });
	try {
		const userSave = await user.save();
		res.status(201).json({ success: true, message: 'User created!', userSave });
	} catch (err) {
		res.json({ success: false, message: 'User or Email already exists' });
	}
}

/*
 |--------------------------------------------------------------------------
 |  LOGIN VALIDATION
 |--------------------------------------------------------------------------
*/
exports.login = async (req, res) => {

	//Validate data before making a user
	const { error } = loginValidation(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	const { email, password } = req.body;

	User.findOne({ email })
		.then((data) => {
			if (!data) {
				return Promise.reject("invalid");
			} else {
				return bcrypt.compare(password, data.password).then((valid) => {
					if (!valid) {
						return Promise.reject("invalid");
					} else {
						return Promise.resolve(data);
					}
				});
			}
		})
		.then((user) =>
			createToken({ _id: user._id }).then((token) =>
				res.json({ success: true, message: 'User authenticated!', token })
			)
		)
		.catch((err) =>
			err === "invalid"
				? res.status(400).json({
					email: "Invalid email",
					password: "Invalid password",
				})
				: console.error(err) || res.sendStatus(500)
		);
};


/*
 |--------------------------------------------------------------------------
 |  GET USERS
 |--------------------------------------------------------------------------
*/
exports.getUsers = async (req, res) => {
    const users = await User.find();
    res.status(200).json({ users: users});
};

/*
 |--------------------------------------------------------------------------
 |  GET USER
 |--------------------------------------------------------------------------
*/
exports.getUser = async (req, res) => {
    // const { userId } = req.params.id;
    // const user = await User.findById({ user._id === userId })
    res.send(req.user)


};
/*
 |--------------------------------------------------------------------------
 |  UPDATE USER
 |--------------------------------------------------------------------------
*/
exports.updateUser = (req, res) => {

};
/*
 |--------------------------------------------------------------------------
 |  DELETE USER
 |--------------------------------------------------------------------------
*/
exports.deleteUser = (req, res) => {

};
