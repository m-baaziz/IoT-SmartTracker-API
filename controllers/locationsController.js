import _ from 'lodash'
import request from 'request'

import Location from '../models/location'
import Device from '../models/device'

const get = (req, res) => {
	Device.find((error, devices) => {
		if (error) res.send(error);

		res.json({ locations: _.map(devices, "locations")});
	})
}

const post = (req, res) => {
	let { deviceMac, deviceIpv4, collectedAt, scanResult } = req.body;
	const location = new Location();
	collectedAt = _.toNumber(collectedAt);
	location.collectedAt = collectedAt;
	const wifiAccessPoints = _.map(scanResult, i => { 
		let { mac, signal_level } = i
		return {  macAddress: mac, signalStrength: _.toNumber(signal_level) };
	})
	const deviceCallback = (error, device) => {
		if (error) res.send(error);
		if (!device) res.send("device not found");
		request.post( 'https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyB8V9-S8-wbtWjY0OjJY8PApKEeb9fiTI0',
		  { json: { wifiAccessPoints } },
	    (error, response, body) => {
	    	if (error) res.send(error);
        if (!error && response.statusCode == 200) {
        	device.locations.push(location);
					location.device = device;
        	location.latitude = body.location.lat;
					location.longitude = body.location.lng;
					location.accuracy = body.accuracy;

					device.save(error => {
						if (error) res.send(error);
						location.save(error => {
							if (error) res.send(error);
							else {
								console.log(device.user, req.user._id);
								const deviceUserSocket = req.app.get('sockets')[device.user];
								// dont send response if the sender is the owner's smartphone and he is listening through the socket, he will need the connection to get location 
								if (device.user != req.user._id || !deviceUserSocket) {
									console.log("sending");
									res.json({ message: `Location successfully added to device ${device._id}`, location });
								} else {
									console.log("not sending");
								}
								if (deviceUserSocket) {
									deviceUserSocket.emit('newLocation', {
									 mac: device.mac,
									 latitude: location.latitude,
									 longitude: location.longitude, 
									 accuracy: location.accuracy,
									 collectedAt: location.collectedAt
									});
								}
							}
						})
					})
        } else {
        	res.send(body);
        }
	    }
		);
	}

	if (!_.isEmpty(deviceMac)) {
		Device.findOne({mac: deviceMac}, deviceCallback);
	} else {
		if (!_.isEmpty(deviceIpv4)) {
			Device.findOne({ipv4: deviceIpv4}, deviceCallback);
		} else {
			res.send("Device not found")
		}
	}
}

module.exports = { get, post };