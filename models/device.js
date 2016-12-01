import mongoose, { Schema } from 'mongoose'

const deviceSchema = new Schema({
	mac: String,
	ipv4: String,
	locations: [{ type: Schema.Types.ObjectId, ref: 'Location'}],
	user: { type: Schema.Types.ObjectId, ref: 'User'}
}, {
	timestamps: true
});

module.exports = mongoose.model('Device', deviceSchema);