import express from 'express'
import morgan from 'morgan'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import passport from 'passport'

import authenticationController from './controllers/authenticationController'
import locationsController from './controllers/locationsController'
import devicesController from './controllers/devicesController'
import usersController from './controllers/usersController'

const app = express();
const router = express.Router();

mongoose.connect('mongodb://localhost:27017/smarttracker');

app.use(bodyParser.urlencoded({
		extended: true
	}))
	.use(bodyParser.json())
	.use(morgan('combined'))
	.use('/api', router)
	.use(passport.initialize());



router.route('/users')
	.get(authenticationController.isAuthenticated, usersController.get)
	.post(usersController.post)

router.route('/devices')
	.get(authenticationController.isAuthenticated, devicesController.get)
	.post(authenticationController.isAuthenticated, devicesController.post)
router.route('/devices/:id')
	.get(authenticationController.isAuthenticated, devicesController.getById)
router.route('/devices/:id/locations')
	.get(authenticationController.isAuthenticated, devicesController.getLocations)

router.route('/locations')
	.get(authenticationController.isAuthenticated, locationsController.get)
	.post(authenticationController.isAuthenticated, locationsController.post)
	

app.listen(8080);