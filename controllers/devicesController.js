import express from 'express'

import Device from '../models/device'

const devicesRouter = express.Router();

// GET

devicesRouter.get('/devices', (req, res) => {
	Device.find((error, devices) => {
		if (error) res.send(error);

		res.json({ devices });
	})
})

// POST 

devicesRouter.post('/device', (req, res) => {
	const { ownerName, mac, ipv4 } = req.body;
	const device = new Device();
	device.mac = mac;
	device.ipv4 = ipv4;

	if (!_.isEmpty(ownerName)) {
		Device.findOne({name: ownerName}, (error, user) => {
			if (error) res.send(error);
			user.devices.push(device);
			user.save(error => {
				if (error) res.send(error);
			})
		});
	}

	device.save(error => {
		if (error) res.send(error);

		res.json({ message: "Device successfully added", device });
	});
})

module.exports = devicesRouter;