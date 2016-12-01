import _ from 'lodash'
import express from 'express'

import Location from '../models/location'
import Device from '../models/device'

const locationsRouter = express.Router();

// GET

locationsRouter.get('/locations', (req, res) => {
	Device.find((error, devices) => {
		if (error) res.send(error);

		res.json({ locations: _.map(devices, "locations")});
	})
})

// POST 

locationsRouter.post('/location', (req, res) => {
	const { deviceMac, deviceIpv4, collectedAt, latitude, longitude, accuracy } = req.body;
	const location = new Location();
	location.collectedAt = collectedAt;
	location.latitude = latitude;
	location.longitude = longitude;
	location.accuracy = accuracy;

	const deviceCallback = (error, device) => {
		if (error) res.send(error);
		device.locations.push(location);
		device.save(error => {  // add cascade update on user
			if (error) res.send(error);
			res.json({ message: `Location successfully added to device ${device._id}`, location });
		})
	}

	if (!_.isEmpty(deviceMac)) {
		Device.findOne({mac: deviceMac}, deviceCallback);
	} else {
		if (!_.isEmpty(deviceIpv4)) {
			Device.findOne({ipv4: deviceIpv4}, deviceCallback);
		}
	}
})

module.exports = locationsRouter;