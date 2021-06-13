const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
		type: String,
		required: true,
	},
    email: {
        type: String,
        unique: true,
        trim: true,
        max: 255,
		min: 6
    },
    password: {
        type: String,
        required: true,
		max: 1024,
		min: 6
    }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);