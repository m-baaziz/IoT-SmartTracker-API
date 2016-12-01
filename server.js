import express from 'express'
import morgan from 'morgan'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'

import locationsController from './controllers/locationsController'
import devicesController from './controllers/devicesController'
import usersController from './controllers/usersController'

const app = express();
const router = express.Router();

app.use(bodyParser.urlencoded({
		extended: true
	}))
	.use(morgan('combined'))
	.use('/api', router);

router.route('users')
	.get(usersController.get)
	.post(usersController.post)

	// continuer avec reste ...

mongoose.connect('mongodb://localhost:27017/smarttracker');
	

app.listen(8080);