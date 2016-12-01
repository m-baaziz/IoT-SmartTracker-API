import mongoose, { Schema } from 'mongoose'

const locationSchema = new Schema({
	device: { type: Schema.Types.ObjectId, ref:'Device' },
	collectedAt: { type: Date, default : Date.now},
	latitude: Number,
	longitude: Number,
	accuracy: Number
}, {
	timestamps: true
});

module.exports = mongoose.model('Location', locationSchema);