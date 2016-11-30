import express from 'express'

import Location from '../models/location'

const locationsRouter = express.Router();

// GET

locationsRouter.get('/locations', (req, res) => {
	Location.find((error, locations) => {
		if (error) res.send(error);

		res.json({ locations });
	})
})

// POST 

locationsRouter.post('/location', (req, res) => {
	const { collectedAt, latitude, longitude, accuracy } = req.body;
	console.log(req.body)
	const location = new Location();
	location.collectedAt = collectedAt;
	location.latitude = latitude;
	location.longitude = longitude;
	location.accuracy = accuracy;

	// TO DO : add device by ip, find device by ipv4/mac address and add device object to location.device

	location.save(error => {
		if (error) res.send(error);

		res.json({ message: "Location successfully added", location });
	});
})

module.exports = locationsRouter;