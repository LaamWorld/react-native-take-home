import axios from 'axios';
import { fetchOrders } from './orders';

jest.mock('axios');

const mockOrders = [
	{
		order_created_at: '2024-06-01',
		order_number: 12345,
		order_name: 'LAAM-12345',
		order_id: 1,
		order_hash: 'hash1',
		order_state: 'ARCHIVED',
		conversion_rate: 1,
		base_currency_code: 'usd',
		conversion_rate_to_usd: 1,
		total_order_cost: 100,
		count_of_items_in_order: 2,
		estimated_shipping_date: null,
		return_items: { delivered: [], cancelled: [] },
	},
];

describe('fetchOrders', () => {
	it('fetches orders from API', async () => {
		(axios.get as jest.Mock).mockResolvedValueOnce({ data: mockOrders });
		const result = await fetchOrders(1, 10);
		expect(result).toEqual(mockOrders);
		expect(axios.get).toHaveBeenCalledWith(
			expect.stringContaining('/orders'),
			expect.objectContaining({ params: expect.any(Object) })
		);
	});
});
