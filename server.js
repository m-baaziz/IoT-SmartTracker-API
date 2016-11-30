import express from 'express'
import morgan from 'morgan'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'

import locationsRouter from './controllers/locationsController'

const app = express();

const router = express.Router();

app.use(bodyParser.urlencoded({
		extended: true
	}))
	.use(morgan('combined'))
	.use('/api', locationsRouter, router);

mongoose.connect('mongodb://localhost:27017/smarttracker');

// GET 

router.get('/devices', (req, res) => {
	res.json({devices: ["Device1", "Device2", "BlaBla"]});
});

// POST
	

app.listen(8080);