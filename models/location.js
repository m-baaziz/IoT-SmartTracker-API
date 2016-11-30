import mongoose, { Schema } from 'mongoose'

const locationSchema = new Schema({
	collectedAt: { type: Date, default : Date.now},
	latitude: Number,
	longitude: Number,
	accuracy: Number
}, {
	timestamps: true
});

module.exports = mongoose.model('Location', locationSchema);