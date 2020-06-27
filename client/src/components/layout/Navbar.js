import React, { useState, useContext, useEffect } from 'react';

import { useHistory, Link } from 'react-router-dom';
import { Menu } from 'antd';

import { HomeOutlined, LoginOutlined, LogoutOutlined } from '@ant-design/icons';
import AuthContext from '../../context/auth/authContext';

export const Navbar = () => {
	const [current, setCurrent] = useState('');
	const authContext = useContext(AuthContext);
	const history = useHistory();
	const { isAuthenticated, user, logout, loadUser } = authContext;

	useEffect(() => {
		user &&
			user.userId &&
			user.userName &&
			loadUser(user.userId, user.userName);
	}, []);
	const login = () => history.push('/login');
	const logoutLink = () => {
		logout();
		history.push('/');
	};

	return (
		<>
			<Menu
				theme='dark'
				className='flex justify-end'
				onClick={setCurrent}
				selectedKeys={[current]}
				mode='horizontal'
			>
				{isAuthenticated && (
					<Menu.Item
						key='Home'
						icon={<HomeOutlined style={{ fontSize: '2rem' }} />}
					>
						<Link to='/'>Markets</Link>
					</Menu.Item>
				)}
				{!isAuthenticated && (
					<Menu.Item
						onClick={login}
						key='Login'
						icon={<LoginOutlined style={{ fontSize: '2rem' }} />}
					>
						Login
					</Menu.Item>
				)}
				{isAuthenticated && (
					<Menu.Item
						onClick={logoutLink}
						key='Logout'
						icon={<LogoutOutlined style={{ fontSize: '2rem' }} />}
					>
						Logout
					</Menu.Item>
				)}
				<Menu.Item key='Logo'>
					<div className='logo'>
						<img
							className='h-10 rounded-full'
							src='https://www.bitazza.com/local/landing-page/assets/svg/logo-horizontal.svg'
							alt='Logo'
						/>
					</div>
				</Menu.Item>
			</Menu>
		</>
	);
};
