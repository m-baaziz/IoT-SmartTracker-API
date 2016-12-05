import express from 'express'
import morgan from 'morgan'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import passport from 'passport'
import bcrypt from 'bcrypt-nodejs'

import authenticationController from './controllers/authenticationController'
import locationsController from './controllers/locationsController'
import devicesController from './controllers/devicesController'
import usersController from './controllers/usersController'

import User from './models/user'

const app = express();
const apiRouter = express.Router();

mongoose.connect('mongodb://localhost:27017/smarttracker');

app.use(bodyParser.urlencoded({
		extended: true
	}))
	.use(bodyParser.json())
	.use(morgan('combined'))
	.use('/api', apiRouter)
	.use(passport.initialize());

app.set('sockets', {});



apiRouter.route('/users')
	.get(authenticationController.isAuthenticated, usersController.get)
	.post(usersController.post)

apiRouter.route('/devices')
	.get(authenticationController.isAuthenticated, devicesController.get)
	.post(authenticationController.isAuthenticated, devicesController.post)
apiRouter.route('/devices/:id')
	.get(authenticationController.isAuthenticated, devicesController.getById)
apiRouter.route('/devices/:id/locations')
	.get(authenticationController.isAuthenticated, devicesController.getLocations)
apiRouter.route('/locations')
	.get(authenticationController.isAuthenticated, locationsController.get)
	.post(authenticationController.isAuthenticated, locationsController.post)

const server = app.listen(8080);

const io = require('socket.io').listen(server);

io.use((socket, next) => {
  const data = socket.request;
  const { username, password } = data._query;
  console.log(username, password);
  User.findOne({ username }, (error, user) => {
  	user.verifyPassword(password, (error, isMatch) => {
	    if (error) return console.log(error);
	    if (isMatch) {
	    	console.log("match !");
	    	let sockets = app.get('sockets');
	    	sockets[user._id] = socket;
  			next();
	    } else {
	    	console.log("passwords dont match !!")
	    }
	  });
  });
});

io.sockets.on('connection', socket => {
	console.log("connection");
})
