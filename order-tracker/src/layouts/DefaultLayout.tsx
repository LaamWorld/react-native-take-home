// src/layouts/AppLayout.tsx
import { Outlet } from 'react-router-dom';

const AppLayout = () => {
	return (
		<div>
			<header>
				<h1>Order Tracker</h1>
			</header>

			<main>
				<Outlet />
			</main>

			<footer
				style={{ display: 'flex', minHeight: '50px', justifyContent: 'center', alignItems: 'center' }}
			>
				<small>© 2025 Order Tracker</small>
			</footer>
		</div>
	);
};

export default AppLayout;
