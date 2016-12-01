import mongoose, { Schema } from 'mongoose'

import Device from './device'

const userSchema = new Schema({
	name: String,
	devices: [{ type: Schema.Types.ObjectId, ref: 'Device'}]
}, {
	timestamps: true
});

module.exports = mongoose.model('User', userSchema);