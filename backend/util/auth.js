import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const KEY = 'supersecret';

export const createJSONToken = (nickname) => {
	return jwt.sign({ nickname }, KEY, { expiresIn: '1h' });
};

export const validateJSONToken = (token) => {
	return jwt.verify(token, KEY);
};

export const isValidPassword = (password, storedPassword) => {
	return password === storedPassword
};
