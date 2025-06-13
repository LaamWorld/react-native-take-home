import axios from 'axios';
import type { Order } from '../types/order';

const API_BASE_URL = 'http://localhost:4000';

export const fetchOrders = async (page: number, limit: number): Promise<Order[]> => {
	const response = await axios.get<Order[]>(`${API_BASE_URL}/orders`, {
		params: {
			_sort: 'order_created_at',
			_order: 'desc',
			_page: page,
			_limit: limit,
		},
	});
	return response.data;
};

export const fetchOrderDetails = async (orderId: number): Promise<Order> => {
	const response = await axios.get<Order>(`${API_BASE_URL}/orders/${orderId}`);
	return response.data;
};
