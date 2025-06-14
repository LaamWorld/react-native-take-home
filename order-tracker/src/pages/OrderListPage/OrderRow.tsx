import React from 'react';
import { Box, Card, CardContent, Typography, Chip, CircularProgress } from '@mui/material';
import { ROUTES } from '../../configs/constants';
import type { Order } from '../../types/order';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonthOutlined';
import Inventory2Icon from '@mui/icons-material/Inventory2Outlined';
import PaidIcon from '@mui/icons-material/PaidOutlined';

interface OrderRowProps {
	index: number;
	style: React.CSSProperties;
	isItemLoaded: (index: number) => boolean;
	filteredOrders: Order[];
	navigate: (path: string) => void;
}

const OrderRow: React.FC<OrderRowProps> = ({
	index,
	style,
	isItemLoaded,
	filteredOrders,
	navigate,
}) => {
	const isItemLoadedState = isItemLoaded(index);
	const order = isItemLoadedState ? filteredOrders[index] : null;

	if (!isItemLoadedState) {
		return (
			<Box
				style={style}
				sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}
			>
				<CircularProgress size={24} />
			</Box>
		);
	}

	return (
		<Box style={style} sx={{ px: 1 }}>
			<Card
				elevation={1}
				sx={{
					cursor: 'pointer',
					borderRadius: 2,
					transition: 'box-shadow 0.4s, border-color 0.3s',
					border: '1px solid',
					borderColor: 'divider',
					width: 'calc(100% - 10px)',
					'&:hover': { boxShadow: 4 },
				}}
				onClick={() => navigate(`${ROUTES.DETAIL.replace(':orderId', String(order?.order_id))}`)}
			>
				<CardContent>
					<Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
						<Typography variant='h6' fontWeight={600}>
							Order #{order?.order_number}
						</Typography>
						<Chip
							label={order?.order_state}
							color={order?.order_state === 'ARCHIVED' ? 'default' : 'primary'}
							variant='outlined'
						/>
					</Box>

					<Box sx={{ display: 'flex', mt: 2, flexDirection: 'column', gap: 1 }}>
						<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
							<CalendarMonthIcon fontSize='small' />
							<Typography variant='body2' color='text.secondary'>
								{order?.order_created_at}
							</Typography>
						</Box>

						<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
							<PaidIcon fontSize='small' />
							<Typography variant='body2' color='text.secondary'>
								<b>
									{order?.total_order_cost} {order?.base_currency_code.toUpperCase()}
								</b>
							</Typography>
						</Box>

						<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
							<Inventory2Icon fontSize='small' />
							<Typography variant='body2' color='text.secondary'>
								Items: {order?.count_of_items_in_order}
							</Typography>
						</Box>
					</Box>
				</CardContent>
			</Card>
		</Box>
	);
};

export default OrderRow;
