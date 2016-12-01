import mongoose, { Schema } from 'mongoose'

import Device from './device'

const userSchema = new Schema({
	username: { type: String, required: true, unique: true },
	password: { type: String, required: true, unique: true },
	devices: [{ type: Schema.Types.ObjectId, ref: 'Device'}]
}, {
	timestamps: true
});

module.exports = mongoose.model('User', userSchema);