import React from 'react';
import { Table, Space, Spin } from 'antd';
import moment from 'moment';
import { formatNumber } from '../../utils';
const MarketList = ({ markets }) => {
	const dataSource =
		markets &&
		markets.map((market, i) => {
			const [
				MDUpdateId,
				AccountId,
				ActionDateTime,
				ActionType,
				LastTradePrice,
				OrderId,
				Price,
				ProductPairCode,
				Quantity,
				Side,
			] = market;
			return {
				key: i,
				no: <div>{i + 1}.</div>,
				MDUpdateId,
				AccountId,
				ActionDateTime: moment(ActionDateTime).format(
					'MMMM Do YYYY, h:mm:ss a'
				),
				ActionType,
				LastTradePrice: formatNumber(LastTradePrice),
				OrderId,
				Price,
				ProductPairCode,
				Quantity,
				Side,
			};
		});
	const columns = [
		{
			title: '#',
			dataIndex: 'no',
			align: 'center',
			sorter: (a, b) => a.no - b.no,
			responsive: ['xs', 'sm', 'md', 'lg'],
		},
		{
			title: 'MDUpdateId',
			align: 'center',
			dataIndex: 'MDUpdateId',
			responsive: ['xs', 'sm', 'md', 'lg'],
		},
		{
			title: 'AccountId',
			align: 'center',
			dataIndex: 'AccountId',
			responsive: ['xs', 'sm', 'md', 'lg'],
		},
		{
			title: 'ActionDateTime in Posix format X 1000',
			align: 'center',
			dataIndex: 'ActionDateTime',
			responsive: ['xs', 'sm', 'md', 'lg'],
		},
		{
			title: 'ActionType 0 (New), 1 (Update), 2(Delete)',
			align: 'center',
			dataIndex: 'ActionType',
			responsive: ['xs', 'sm', 'md', 'lg'],
		},
		{
			title: 'LastTradePrice',
			align: 'center',
			dataIndex: 'LastTradePrice',
			responsive: ['xs', 'sm', 'md', 'lg'],
		},
		{
			title: 'OrderId',
			align: 'center',
			dataIndex: 'OrderId',
			responsive: ['xs', 'sm', 'md', 'lg'],
		},
		{
			title: 'Price',
			align: 'center',
			dataIndex: 'Price',
			responsive: ['xs', 'sm', 'md', 'lg'],
		},
		{
			title: 'ProductPairCode',
			align: 'center',
			dataIndex: 'ProductPairCode',
			responsive: ['xs', 'sm', 'md', 'lg'],
		},
		{
			title: 'Quantity',
			align: 'center',
			dataIndex: 'Quantity',
			responsive: ['xs', 'sm', 'md', 'lg'],
		},
		{
			title: 'Side',
			align: 'center',
			dataIndex: 'Side',
			responsive: ['xs', 'sm', 'md', 'lg'],
		},
	];
	return !markets ? (
		<Space size='middle'>
			<Spin size='large' />
		</Space>
	) : (
		<Table
			pagination={{ pageSize: 25 }}
			bordered={true}
			dataSource={dataSource}
			columns={columns}
		/>
	);
};

export default MarketList;
