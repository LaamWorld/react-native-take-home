import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchOrderDetails } from '../../api/orders';
import { OrderItem } from '../../types/order';
import {
	Box,
	Card,
	CardContent,
	Typography,
	Chip,
	CircularProgress,
	Grid,
	Paper,
	Divider,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';

interface OrderItemCardProps {
	item: OrderItem;
}

const OrderItemCard: React.FC<OrderItemCardProps> = ({ item }) => (
	<Card elevation={1} sx={{ display: 'flex', gap: 2, p: 2, alignItems: 'center' }}>
		<img src={item.image_url} alt={item.title} width={60} height={80} style={{ borderRadius: 4 }} />
		<Box>
			<Typography fontWeight='bold'>{item.title}</Typography>
			<Typography variant='body2' color='text.secondary'>
				Size: {item.variant_title}
			</Typography>
			<Typography variant='body2' color='text.secondary'>
				Price: {item.final_price}
			</Typography>
			<Typography variant='body2' color='text.secondary'>
				Brand: {item.brand_name}
			</Typography>
			<Typography variant='body2' color='text.secondary'>
				Qty: {item.quantity}
			</Typography>
		</Box>
	</Card>
);

const OrderDetailsPage: React.FC = () => {
	const { orderId } = useParams<{ orderId: string }>();
	const orderIdNum = Number(orderId);

	const {
		data: order,
		isLoading,
		isError,
	} = useQuery({
		queryKey: ['order', orderIdNum],
		queryFn: () => fetchOrderDetails(orderIdNum),
		enabled: !!orderIdNum,
	});

	if (isLoading)
		return (
			<Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
				<CircularProgress />
			</Box>
		);

	if (isError || !order) {
		return (
			<Box sx={{ textAlign: 'center', mt: 4 }}>
				<Typography color='error' variant='h6'>
					Failed to load order.
				</Typography>
			</Box>
		);
	}

	return (
		<Box sx={{ maxWidth: 800, mx: 'auto', mt: 4, pb: 12 }}>
			<Card elevation={2} sx={{ mb: 4, borderRadius: 3 }}>
				<CardContent>
					<Typography variant='h5' fontWeight={600} gutterBottom>
						Order #{order.order_number}
					</Typography>
					<Divider sx={{ mb: 2 }} />

					<Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
						<CalendarMonthOutlinedIcon fontSize='small' />
						<Typography variant='body2' color='text.secondary'>
							{order.order_created_at}
						</Typography>
					</Box>

					<Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
						<Chip label={order.order_state} color='primary' variant='outlined' size='small' />
					</Box>

					<Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
						<PaidOutlinedIcon fontSize='small' />
						<Typography variant='body2' color='text.secondary'>
							{order.total_order_cost} {order.base_currency_code.toUpperCase()}
						</Typography>
					</Box>

					<Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
						<Inventory2OutlinedIcon fontSize='small' />
						<Typography variant='body2' color='text.secondary'>
							Items: {order.count_of_items_in_order}
						</Typography>
					</Box>
				</CardContent>
			</Card>

			<Typography variant='h6' fontWeight={600} mb={2}>
				Delivered Items
			</Typography>
			<Grid container spacing={2} mb={4}>
				{order.return_items.delivered.map((item: OrderItem) => (
					<Grid columns={{ xs: 12, md: 6 }} key={String(item.item_shopify_id)} component='div'>
						<OrderItemCard item={item} />
					</Grid>
				))}
			</Grid>

			<Typography variant='h6' fontWeight={600} mb={2}>
				Cancelled Items
			</Typography>
			<Grid container spacing={2}>
				{order.return_items.cancelled.length === 0 && (
					<Typography variant='body2' color='text.secondary'>
						No cancelled items.
					</Typography>
				)}
				{order.return_items.cancelled.map((item: OrderItem) => (
					<Grid columns={{ xs: 12, md: 6 }} key={String(item.item_shopify_id)} component='div'>
						<OrderItemCard item={item} />
					</Grid>
				))}
			</Grid>

			<Paper
				sx={{
					position: 'fixed',
					left: 0,
					right: 0,
					bottom: 0,
					p: 2,
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
					zIndex: 1000,
				}}
				elevation={8}
			>
				<Typography fontWeight='bold'>Total:</Typography>
				<Typography fontWeight='bold' color='primary'>
					{order.total_order_cost} {order.base_currency_code.toUpperCase()}
				</Typography>
			</Paper>
		</Box>
	);
};

export default OrderDetailsPage;
