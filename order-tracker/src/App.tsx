import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import OrderListPage from './pages/OrderListPage/OrderListPage';
import OrderDetailsPage from './pages/OrderDetailsPage/OrderDetailsPage';
import DefaultLayout from './layouts/DefaultLayout';
import { ROUTES } from './configs/constants';

const App: React.FC = () => {
	return (
		<Router>
			<Routes>
				<Route path={ROUTES.ROOT} element={<DefaultLayout />}>
					{/* Redirect index "/" to "/orders"  with replace to prevent back button from going back to "/" */}
					<Route index element={<Navigate to={ROUTES.LISTING} replace />} />

					{/* Nested routes rendered inside <Outlet /> of DefaultLayout */}
					<Route path={ROUTES.LISTING} element={<OrderListPage />} />
					<Route path={ROUTES.DETAIL} element={<OrderDetailsPage />} />
				</Route>
			</Routes>
		</Router>
	);
};

export default App;
