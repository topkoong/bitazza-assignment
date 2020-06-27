import React, { useEffect, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Row, Col, Typography, Button } from 'antd';
import MarketContext from '../context/market/marketContext';
import AuthContext from '../context/auth/authContext';
import MarketList from '../components/market/MarketList';

const { Title } = Typography;

const Main = () => {
	const [toggleButton, setToggleButton] = useState(true);
	const authContext = useContext(AuthContext);
	const marketContext = useContext(MarketContext);
	const { user, isAuthenticated } = authContext;
	const { getMarkets, markets, unsubscribeMarkets } = marketContext;
	const history = useHistory();

	useEffect(() => {
		getMarkets();
	}, []);
	return (
		<>
			<Row justify='space-between'>
				<Col>
					<Title>Markets Overview</Title>
				</Col>
			</Row>
			<Row gutter={[16, 16]} align='middle' className='my-10'>
				<Col>
					<Button
						disabled={toggleButton}
						type='primary'
						size='large'
						onClick={() => {
							getMarkets();
							setToggleButton(!toggleButton);
						}}
					>
						Get Markets
					</Button>
				</Col>
				<Col>
					<Button
						disabled={!toggleButton}
						type='primary'
						size='large'
						onClick={() => {
							unsubscribeMarkets();
							setToggleButton(!toggleButton);
						}}
					>
						Unsubscribe
					</Button>
				</Col>
			</Row>
			<Row>
				<Col span={24}>
					<div className='overflow-auto'>
						{markets && <MarketList markets={markets} />}
					</div>
				</Col>
			</Row>
		</>
	);
};

export default Main;
