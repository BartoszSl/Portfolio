import { useRouteError } from 'react-router-dom';
import PageContent from '../components/PageContent';

const ErrorPage = () => {
	const error: any = useRouteError();

	let title = 'An error occured!';
	let message = 'Something went wrong!';

	if (error.status === 500) {
		message = error.message;
	}

	if (error.status === 404) {
		title = 'Not found!';
		message = 'Could not find resource or page.';
	}

	return (
		<>
			<PageContent title={title}>
				<p>{message}</p>
			</PageContent>
		</>
	);
};

export default ErrorPage;
