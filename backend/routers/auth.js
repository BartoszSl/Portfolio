import { get } from '../data/user.js';
import { isValidPassword, createJSONToken } from '../util/auth.js';

const authRouter = async (req, res) => {
	const nickname = req.body.nickname;
	const password = req.body.password;

	let user;
	try {
		user = await get(nickname);
		console.log(user);
	} catch (err) {
		return res.status(401).json({ message: 'Authentication failed' });
	}

	const pwIsValid = isValidPassword(password, user.password);
	if (!pwIsValid) {
		console.log('nie działa v2');
		return res.status(422).json({
			message: 'Invalid credentials.',
			errors: { credentials: 'Invalid nickname or password entered' },
		});
	}

	const token = createJSONToken(nickname);
	res.json({ token });
};

export default authRouter;
