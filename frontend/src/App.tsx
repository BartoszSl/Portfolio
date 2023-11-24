import React from 'react';

import {
	RouterProvider,
	createBrowserRouter,
	Navigate,
	Outlet,
} from 'react-router-dom';

import './App.scss';
import LoginPage from './pages/Login';
import ErrorPage from './pages/Error';

import { tokenLoader } from './util/auth';
import { action as authAction } from './pages/Login';
import { action as logoutAction } from './pages/Logout';
import DashboardRootLayout from './pages/DashboardRoot';

export const DefaultPage: React.FC = () => {
	return (
		<>
			<Navigate to='/auth?mode=login' />
			<Outlet />
		</>
	);
};

const router = createBrowserRouter([
	{
		path: '/',
		element: <DefaultPage />,
		errorElement: <ErrorPage />,
		loader: tokenLoader,
		id: 'root',
		children: [
			{
				path: 'dashboard',
				element: <DashboardRootLayout />,
				children: [
					{ index: true, path: 'main', element: <></> },
					{ path: 'discounts', element: <></> },
					{ path: 'products', element: <></> },
				],
			},
			{
				path: 'auth',
				element: <LoginPage />,
				action: authAction,
			},
			{
				path: 'logout',
				action: logoutAction,
			},
		],
	},
]);

const App: React.FC = () => {
	return (
		<>
			<RouterProvider router={router} />
		</>
	);
};

export default App;
