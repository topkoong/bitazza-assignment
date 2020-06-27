import React from 'react';
import { Row, Col } from 'antd';
export const Logo = () => (
	<Row>
		<Col>
			<div className='logo mb-4'>
				<img
					style={{ height: '10rem' }}
					src='https://www.bitazza.com/static/media/bitazza-icon-gradient.22623e9d.svg'
					alt='Logo'
				/>
			</div>
		</Col>
	</Row>
);
