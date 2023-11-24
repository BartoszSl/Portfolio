import { Outlet } from 'react-router-dom';
import DashboardNavigation from '../components/Navigation/DashboardNavigation';

const DashboardRootLayout: React.FC = () => {
	return (
		<>
			<DashboardNavigation />
			<main>
				<Outlet />
			</main>
		</>
	);
};

export default DashboardRootLayout;
