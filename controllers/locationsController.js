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
	const { deviceMac, deviceIpv4, collectedAt, scanResult } = req.body;
	console.log(req.body);
	const location = new Location();
	location.collectedAt = collectedAt;
	const wifiAccessPoints = _.map(scanResult, i => { 
		const { macAddress, signalStrength } = i
		return {  macAddress, signalStrength };
	})

	const deviceCallback = (error, device) => {
		if (error) res.send(error);

		request.post( 'https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyB8V9-S8-wbtWjY0OjJY8PApKEeb9fiTI0',
		  { json: { wifiAccessPoints } },
	    (error, response, body) => {
	    	if (error) res.send(error);
        if (!error && response.statusCode == 200) {
        	device.locations.push(location);
					location.device = device;
					console.log(body)
        	location.latitude = body.location.lat;
					location.longitude = body.location.lng;
					location.accuracy = body.accuracy;

					device.save(error => {
						if (error) res.send(error);
						location.save(error => {
							if (error) res.send(error);

							const deviceUserSocket = req.app.get('sockets')[device.user];
							if (deviceUserSocket) {
								deviceUserSocket.emit('newLocation', {
								 mac: device.mac,
								 latitude: location.latitude,
								 longitude: location.longitude, 
								 accuracy: location.accuracy,
								 collectedAt: location.collectedAt
								});
							}

							res.json({ message: `Location successfully added to device ${device._id}`, location });
						})
					})
        } else {
        	console.log(`response : ${response}, body : `, body)
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