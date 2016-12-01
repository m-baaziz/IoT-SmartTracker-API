import _ from 'lodash'

import User from '../models/user'

const get = (req, res) => {
	console.log('AAAAAA')
	User.find((error, users) => {
		if (error) res.send(error);

		res.json({ users });
	})
}

const post =  (req, res) => {
	const { username, password } = req.body;
	const user = new User();
	user.username = username;
	user.password = password;

	user.save(error => {
		if (error) res.send(error);

		res.json({ message: "User successfully added", user });
	});
}

module.exports = { get, post };