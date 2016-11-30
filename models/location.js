import { Schema, model } from 'mongoose'

const locationSchema = new Schema({
	collectedAt: Date,
	latitude: Number,
	longitude: Number,
	accuracy: Number
});

module.exports = model('Location', locationSchema);