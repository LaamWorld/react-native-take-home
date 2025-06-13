export type OrderItem = {
	item_shopify_id: number;
	title: string;
	variant_title: string;
	final_price: number;
	brand_name: string;
	quantity: number;
	image_url: string;
};

export type Order = {
	order_created_at: string;
	order_number: number;
	order_name: string;
	order_id: number;
	order_hash: string;
	order_state: string;
	conversion_rate: number;
	base_currency_code: string;
	conversion_rate_to_usd: number;
	total_order_cost: number;
	count_of_items_in_order: number;
	estimated_shipping_date: string | null;
	return_items: {
		delivered: OrderItem[];
		cancelled: OrderItem[];
	};
};
