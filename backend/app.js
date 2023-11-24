import bodyParser from 'body-parser';
import express from 'express';

import authRouter from './routers/auth.js';

const app = express();

app.use(bodyParser.json());
app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE');
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
	next();
});

app.post('/login', authRouter);

app.use((error, req, res, next) => {
	const status = error.status || 500;
	const message = error.message || 'Something went wrong.';
	res.status(status).json({ message: message });
});

app.listen(3001, () => {
	console.log('Server Connected');
});
