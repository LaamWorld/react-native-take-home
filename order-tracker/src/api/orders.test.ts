import axios from 'axios';
import { fetchOrders, fetchOrderDetails } from './orders';

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

const mockOrderDetails = {
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
	return_items: {
		delivered: [
			{
				item_shopify_id: 1,
				title: 'Test Item 1',
				variant_title: 'M',
				final_price: 50,
				brand_name: 'Brand A',
				quantity: 1,
				image_url: 'https://placehold.co/60x80',
			},
		],
		cancelled: [
			{
				item_shopify_id: 2,
				title: 'Test Item 2',
				variant_title: 'L',
				final_price: 30,
				brand_name: 'Brand B',
				quantity: 1,
				image_url: 'https://placehold.co/60x80',
			},
		],
	},
};

describe('fetchOrders', () => {
	const axiosGetSpy = jest.spyOn(axios, 'get');

	beforeEach(() => {
		axiosGetSpy.mockClear();
	});

	it('fetches orders from API successfully', async () => {
		axiosGetSpy.mockResolvedValueOnce({ data: mockOrders });
		const result = await fetchOrders(1, 10);
		expect(result).toEqual(mockOrders);
		expect(axiosGetSpy).toHaveBeenCalledWith('http://localhost:4000/orders', {
			params: {
				_sort: 'order_created_at',
				_order: 'desc',
				_page: 1,
				_limit: 10,
			},
		});
	});

	it('handles API error when fetching orders', async () => {
		const errorMessage = 'Network Error';
		axiosGetSpy.mockRejectedValueOnce(new Error(errorMessage));
		await expect(fetchOrders(1, 10)).rejects.toThrow(errorMessage);
		expect(axiosGetSpy).toHaveBeenCalledTimes(1);
	});

	it('returns an empty array when no orders are found', async () => {
		axiosGetSpy.mockResolvedValueOnce({ data: [] });
		const result = await fetchOrders(1, 10);
		expect(result).toEqual([]);
	});
});

describe('fetchOrderDetails', () => {
	const axiosGetSpy = jest.spyOn(axios, 'get');

	beforeEach(() => {
		axiosGetSpy.mockClear();
	});

	it('fetches order details from API successfully', async () => {
		axiosGetSpy.mockResolvedValueOnce({ data: mockOrderDetails });
		const result = await fetchOrderDetails(1);
		expect(result).toEqual(mockOrderDetails);
		expect(axiosGetSpy).toHaveBeenCalledWith('http://localhost:4000/orders/1');
	});

	it('handles API error when fetching order details', async () => {
		const errorMessage = 'Order Not Found';
		axiosGetSpy.mockRejectedValueOnce(new Error(errorMessage));
		await expect(fetchOrderDetails(1)).rejects.toThrow(errorMessage);
	});
});
