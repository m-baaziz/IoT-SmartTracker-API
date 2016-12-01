import mongoose, { Schema } from 'mongoose'
import bcrypt from 'bcrypt-nodejs'

import Device from './device'

const userSchema = new Schema({
	username: { type: String, required: true, unique: true },
	password: { type: String, required: true, unique: true },
	devices: [{ type: Schema.Types.ObjectId, ref: 'Device'}]
}, {
	timestamps: true
});

userSchema.pre('save', function(callback) {
	let user = this;

	if (!user.isModified('password')) return callback;

	bcrypt.genSalt(5, (error, salt) => {
		if (error) return callback(error);

		bcrypt.hash(user.password, salt, null, (error, hash) => {
			if (error) return callback(error);
			user.password = hash;
			callback();
		});
	});
});

userSchema.methods.verifyPassword = function(password, cb) {
  bcrypt.compare(password, this.password, (err, isMatch) => {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

module.exports = mongoose.model('User', userSchema);