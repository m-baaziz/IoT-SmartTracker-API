import express from 'express'
import morgan from 'morgan'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'

import locationsController from './controllers/locationsController'
import devicesController from './controllers/devicesController'
import usersController from './controllers/usersController'

const app = express();
const router = express.Router();

mongoose.connect('mongodb://localhost:27017/smarttracker');

app.use(bodyParser.urlencoded({
		extended: true
	}))
	.use(morgan('combined'))
	.use('/api', router);



router.route('/users')
	.get(usersController.get)
	.post(usersController.post)

router.route('/devices')
	.get(devicesController.get)
	.post(devicesController.post)
router.route('/devices/:id')
	.get(devicesController.getById)
router.route('/devices/:id/locations')
	.get(devicesController.getLocations)

router.route('/locations')
	.get(locationsController.get)
	.post(locationsController.post)
	

app.listen(8080);