import _ from 'lodash'
import express from 'express'

import User from '../models/user'

const usersRouter = express.Router();

// GET

const get = (req, res) => {
	User.find((error, users) => {
		if (error) res.send(error);

		res.json({ users });
	})
}

// POST 

const post =  (req, res) => {
	const { name } = req.body;
	const user = new User();
	user.name = name;

	user.save(error => {
		if (error) res.send(error);

		res.json({ message: "User successfully added", user });
	});
}

module.exports = { get, post };