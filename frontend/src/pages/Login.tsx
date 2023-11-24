import { json, redirect } from 'react-router-dom';
import LoginForm from '../components/Login/LoginForm';

const LoginPage: React.FC = () => {
	return <LoginForm />;
};

export default LoginPage;

type RequestParams = {
	request: {
		url: any;
		formData: () => Promise<FormData>;
	};
};

export const action = async ({ request }: RequestParams) => {
	const searchParams = new URL(request.url).searchParams;
	const mode = searchParams.get('mode') || 'login';

	if (mode !== 'login') {
		throw json({ message: 'Unsupported mode.' }, { status: 422 });
	}

	const data = await request.formData();
	const authdata = {
		nickname: data.get('nickname'),
		password: data.get('password'),
	};

	console.log('dziala');
	console.log(authdata);

	const response = await fetch('http://localhost:3001/login', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(authdata),
	});

	console.log(response);

	if (response.status === 422 || response.status === 401) {
		console.log('blad');
		return response;
	}

	if (!response.ok) {
		console.log('bload');
		throw json({ message: 'Could not authenticate user.' }, { status: 500 });
	}

	console.log('object');

	const resData = await response.json();
	const token = resData.token;

	localStorage.setItem('token', token);

	const expiration = new Date();
	expiration.setHours(expiration.getHours() + 1);
	localStorage.setItem('expiration', expiration.toString());

	console.log('done');

	return redirect('/dashboard');
};
