import { Form, NavLink } from 'react-router-dom';

import classes from './DashboardNavigation.module.scss';

const DashboardNavigation = () => {
	return (
		<nav>
			<ul>
				<li>
					<NavLink
						to='/dashboard/main'
						className={({ isActive }) =>
							isActive ? classes.active : undefined
						}
						end>
						Główna
					</NavLink>
				</li>
				<li>
					<NavLink
						to='/dashboard/discounts'
						className={({ isActive }) =>
							isActive ? classes.active : undefined
						}>
						Zniżki
					</NavLink>
				</li>
				<li>
					<NavLink
						to='/dashboard/products'
						className={({ isActive }) =>
							isActive ? classes.active : undefined
						}>
						Produkty
					</NavLink>
				</li>
				<li>
					<Form action='/logout' method='POST'>
						<button>logout</button>
					</Form>
				</li>
			</ul>
		</nav>
	);
};

export default DashboardNavigation;
