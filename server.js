import express from 'express'
import morgan from 'morgan'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'

import Location from './models/location'

const app = express();
const router = express.Router();

app.use(bodyParser.urlencoded({
		extended: true
	}))
	.use(morgan('combined'))
	.use('/api', router);

mongoose.connect('mongodb://localhost:27017/smarttracker');

// GET 

router.get('/devices', (req, res) => {
	res.json({devices: ["Device1", "Device2", "BlaBla"]});
})
	.get('/locations', (req, res) => {
		Location.find((error, locations) => {
			if (error) res.send(error);

			res.json({ locations });
		})
	})

// POST

router.post('/location', (req, res) => {
	const { collectedAt, latitude, longitude, accuracy } = req.body;
	console.log(req.body)
	const location = new Location();
	location.collectedAt = collectedAt;
	location.latitude = latitude;
	location.longitude = longitude;
	location.accuracy = accuracy;

	location.save(error => {
		if (error) res.send(error);

		res.json({ message: "Location successfully added", location });
	});
})
	

app.listen(8080);