import _ from 'lodash'
import express from 'express'
import mongoose from 'mongoose'

import Device from '../models/device'
import User from '../models/user'

const devicesRouter = express.Router();

// GET

devicesRouter.get('/devices', (req, res) => {
	Device.find((error, devices) => {
		if (error) res.send(error);
		res.json({ devices });
	})
})
	.get('/device/:id', (req, res) => {
		Device.findById(mongoose.Types.ObjectId(req.params.id), (error, device) => {
			if (error) res.send(error);
			res.json({ device });
		});
	})
	.get('/device/:id/locations', (req, res) => {
		Device.findById(mongoose.Types.ObjectId(req.params.id), (error, device) => {
			if (error) res.send(error);
			res.json({ locations: _.sortBy(device.locations, [(o) => {return o.collectedAt}, (o) => {return o.createdAt}]) });
		});
	})

// POST 

devicesRouter.post('/device', (req, res) => {
	const { ownerName, mac, ipv4 } = req.body;
	const device = new Device();
	device.mac = mac;
	device.ipv4 = ipv4;

	if (!_.isEmpty(ownerName)) {
		User.findOne({name: ownerName}, (error, user) => {
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