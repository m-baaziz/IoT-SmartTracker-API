import _ from 'lodash'
import mongoose from 'mongoose'

import Device from '../models/device'
import User from '../models/user'

const get = (req, res) => {
	Device.find((error, devices) => {
		if (error) res.send(error);
		res.json({ devices });
	})
}

const getById = (req, res) => {
	Device.findById(mongoose.Types.ObjectId(req.params.id), (error, device) => {
		if (error) res.send(error);
		res.json({ device });
	});
}

const getLocations = (req, res) => {
	Device.findById(mongoose.Types.ObjectId(req.params.id), (error, device) => {
		if (error) res.send(error);
		res.json({ locations: _.sortBy(device.locations, [(o) => {return o.collectedAt}, (o) => {return o.createdAt}]) });
	});
}

const post = (req, res) => {
	const { ownerName, mac, ipv4 } = req.body;
	const device = new Device();
	device.mac = mac;
	device.ipv4 = ipv4;

	if (!_.isEmpty(ownerName)) {
		User.findOne({username: ownerName}, (error, user) => {
			if (error) res.send(error);
			device.user = user;
			user.devices.push(device);
			user.save(error => {
				if (error) res.send(error);
			});
			device.save(error => {
				if (error) res.send(error);
				res.json({ message: "Device successfully added", device });
			});
		});
	}
}

module.exports = { get, getById, getLocations, post };