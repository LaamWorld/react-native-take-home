import React, { useState, useMemo, useCallback } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchOrders } from '../../api/orders';
import type { Order } from '../../types/order';
import {
	Box,
	Card,
	CardContent,
	Typography,
	Chip,
	TextField,
	CircularProgress,
	Container,
	Paper,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import type { InfiniteData } from '@tanstack/react-query';
import { FixedSizeList as List, ListOnItemsRenderedProps } from 'react-window';
import { ROUTES } from '../../configs/constants';
import OrderRow from './OrderRow';

const PAGE_SIZE = 10;
const LIST_HEIGHT = 600; // px
const ITEM_SIZE = 180; // px, adjust as needed for Card height
const LOAD_MORE_THRESHOLD = 3; // How close to the end before loading more

const OrderListPage: React.FC = () => {
	const [search, setSearch] = useState('');
	const navigate = useNavigate();

	const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useInfiniteQuery<
		Order[],
		Error,
		Order[],
		string[]
	>({
		queryKey: ['orders'],
		queryFn: ({ pageParam = 1 }) => fetchOrders(Number(pageParam), PAGE_SIZE),
		getNextPageParam: (lastPage, allPages) =>
			lastPage && lastPage.length === PAGE_SIZE ? allPages.length + 1 : undefined,
		initialPageParam: 1,
	});

	const infiniteData = data as InfiniteData<Order[]> | undefined;
	const orders: Order[] = (infiniteData?.pages ?? []).flat();
	const filteredOrders = useMemo(() => {
		if (!search) return orders;
		return orders.filter((order: Order) => String(order.order_number).includes(search));
	}, [orders, search]);

	const itemCount = hasNextPage ? filteredOrders.length + 1 : filteredOrders.length;

	const isItemLoaded = (index: number) => !hasNextPage || index < filteredOrders.length;

	const renderOrderRow = ({ index, style }: { index: number; style: React.CSSProperties }) => (
		<OrderRow
			index={index}
			style={style}
			isItemLoaded={isItemLoaded}
			filteredOrders={filteredOrders}
			navigate={navigate}
		/>
	);

	const handleItemsRendered = useCallback(
		(props: ListOnItemsRenderedProps) => {
			const { visibleStopIndex } = props;
			if (
				hasNextPage &&
				!isFetchingNextPage &&
				visibleStopIndex >= filteredOrders.length - LOAD_MORE_THRESHOLD
			) {
				fetchNextPage();
			}
		},
		[hasNextPage, isFetchingNextPage, filteredOrders.length, fetchNextPage]
	);

	return (
		<Container maxWidth='lg'>
			<Paper elevation={3} sx={{ p: { xs: 2, sm: 4 }, borderRadius: 3 }}>
				<Typography variant='h4' gutterBottom align='center' sx={{ fontWeight: 600, mb: 3 }}>
					Orders
				</Typography>
				<TextField
					label='Search by order number'
					value={search}
					onChange={e => setSearch(e.target.value)}
					fullWidth
					margin='normal'
					type='number'
					variant='outlined'
					sx={{ mb: 3 }}
				/>
				{isLoading ? (
					<Box sx={{ display: 'flex', justifyContent: 'center', mt: 6, mb: 6 }}>
						<CircularProgress size={40} />
					</Box>
				) : (
					<>
						{filteredOrders.length === 0 ? (
							<Typography align='center' color='text.secondary' sx={{ mt: 6, mb: 6 }}>
								No orders found.
							</Typography>
						) : (
							<List
								height={LIST_HEIGHT}
								itemCount={itemCount}
								itemSize={ITEM_SIZE}
								width={'100%'}
								onItemsRendered={handleItemsRendered}
							>
								{renderOrderRow}
							</List>
						)}
					</>
				)}
			</Paper>
		</Container>
	);
};

export default OrderListPage;
