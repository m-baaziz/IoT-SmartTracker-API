import mongoose, { Schema } from 'mongoose'

import Location from './location'
import User from './user'

const deviceSchema = new Schema({
	mac: String,
	ipv4: String,
	locations: [Location],
	user: { type: Schema.Types.ObjectId, ref: 'User'}
}, {
	timestamps: true
});

module.exports = mongoose.model('Device', deviceSchema);