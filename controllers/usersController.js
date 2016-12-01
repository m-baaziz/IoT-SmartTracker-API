import express from 'express'

import User from '../models/user'

const usersRouter = express.Router();

// GET

usersRouter.get('/users', (req, res) => {
	User.find((error, users) => {
		if (error) res.send(error);

		res.json({ users });
	})
})

// POST 

usersRouter.post('/user', (req, res) => {
	const { name } = req.body;
	const user = new User();
	user.name = name;

	user.save(error => {
		if (error) res.send(error);

		res.json({ message: "User successfully added", user });
	});
})

module.exports = usersRouter;