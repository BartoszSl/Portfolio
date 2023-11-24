import React, { useRef } from 'react';

import classes from './LoginForm.module.scss';

import SimpleLoginInput, { SimpleLoginInputRef } from '../UI/SimpleLoginInput';
import Button from '../UI/Button';
import { Form, useActionData, useNavigation } from 'react-router-dom';
import { Link } from 'react-router-dom';

const LoginForm: React.FC = () => {
	const data: any = useActionData();
	const navigation = useNavigation();

	const isSubmitting = navigation.state === 'submitting';

	const nicknameInputRef = useRef<SimpleLoginInputRef>(null);
	const passwordInputRef = useRef<SimpleLoginInputRef>(null);

	return (
		<section className={classes.login}>
			<Form method='post' className={classes['login--form']}>
				{data && data.error && (
					<ul>
						{Object.values(data.errors).map((err: any) => (
							<li key={err}>{err}</li>
						))}
					</ul>
				)}
				{data && data.message && <p>{data.message}</p>}
				<h2>Zaloguj się do panelu</h2>
				<p>
					Nie masz konta?<span className='orange-text'> No buwa</span>
				</p>

				<div className={classes.inputs}>
					<SimpleLoginInput
						ref={nicknameInputRef}
						label='Nazwa użytkownika'
						type='text'
						id='nickname'
					/>
					<SimpleLoginInput
						ref={passwordInputRef}
						label='Hasło'
						type='password'
						id='password'
						special='Zapomniałeś Hasła?'
					/>
				</div>

				<Button type='submit' classes='orange-background'>
					{isSubmitting ? 'Submitting...' : 'Zaloguj się'}
				</Button>

				<hr className={classes.hr} />

				<Button type='button' onClick={() => {}} classes=''>
					Import data to database
				</Button>
			</Form>
		</section>
	);
};

export default LoginForm;

// useEffect(() => {
// 	nicknameInputRef.current!.focus();
// 	passwordInputRef.current!.focus();
// }, []);

// const submitLoginFormHandler = (e: React.FormEvent) => {
// 	e.preventDefault();
// 	const value = {
// 		nickname: nicknameInputRef.current!.getValue(),
// 		password: passwordInputRef.current!.getValue(),
// 	};
// };
