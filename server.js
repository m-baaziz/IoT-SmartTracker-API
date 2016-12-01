import express from 'express'
import morgan from 'morgan'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'

import locationsRouter from './controllers/locationsController'
import devicesRouter from './controllers/devicesController'
import usersRouter from './controllers/usersController'

const app = express();

app.use(bodyParser.urlencoded({
		extended: true
	}))
	.use(morgan('combined'))
	.use('/api', locationsRouter, devicesRouter, usersRouter);

mongoose.connect('mongodb://localhost:27017/smarttracker');
	

app.listen(8080);