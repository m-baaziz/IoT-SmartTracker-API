import passport from 'passport'
import { BasicStrategy } from 'passport-http'

import User from '../models/user'

passport.use(new BasicStrategy((username, password, callback) => {
	User.findOne({ username }, (error, user) => {
		if (error) return callback(error);
		if (!user) return callback(null, false);
		if (user) {
			user.verifyPassword(password, (error, isMatch) => {
				if (error) return callback(error);
				if (!isMatch) return callback(null, false);
				if (isMatch) return callback(null, user)
			});
		}
	});
}));

exports.isAuthenticated = passport.authenticate('basic', { session: false });