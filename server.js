import express from 'express'
import morgan from 'morgan'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'

import Location from './models/location'

const app = express();
const router = express.Router();

mongoose.connect('mongodb://localhost:27017/smarttracker');

app.use(morgan('combined'))
	.use('/api', router);

router.get('/devices', (req, res) => {
	res.json({devices: ["Device1", "Device2", "BlaBla"]});
})
	

app.listen(8080);