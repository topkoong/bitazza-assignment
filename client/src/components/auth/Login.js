import React, { useState, useContext, useEffect } from 'react';
import { Form, Input, Button, Row, Col, Typography, Alert } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import AuthContext from '../../context/auth/authContext';
import { useHistory } from 'react-router-dom';
import { Logo } from '../layout/Logo';
const { Title } = Typography;
const layout = {
	labelCol: {
		span: 8,
	},
	wrapperCol: {
		span: 16,
	},
};
const tailLayout = {
	wrapperCol: {
		offset: 8,
		span: 16,
	},
};
const Login = () => {
	const authContext = useContext(AuthContext);
	const [loginErrorAlert, setLoginErrorAlert] = useState(false);
	const history = useHistory();
	const { login, error, isAuthenticated, clearErrors } = authContext;
	useEffect(() => {
		if (error) {
			setLoginErrorAlert(true);
		} else {
			if (isAuthenticated) {
				history.push('/');
			}
		}
	}, [error, isAuthenticated, history]);

	const onFinish = (values) => {
		login({
			username: values.username,
			password: values.password,
		});
	};

	const onFinishFailed = (errorInfo) => {
		setLoginErrorAlert(true);
	};

	const handleClose = () => {
		clearErrors();
		setLoginErrorAlert(false);
	};

	return (
		<div className='flex flex-col justify-center items-center'>
			<Logo />
			<Row span={24}>
				<Col>
					<Title className='mb-4'>Login</Title>
				</Col>
			</Row>

			<Row span={24}>
				<Col>
					<Form
						{...layout}
						name='basic'
						onFinish={onFinish}
						onFinishFailed={onFinishFailed}
					>
						<Form.Item
							label='Email'
							name='username'
							rules={[
								{
									required: true,
									message: 'Please enter your email',
								},
							]}
						>
							<Input
								prefix={
									<UserOutlined className='site-form-item-icon' />
								}
								placeholder='Please enter your email'
							/>
						</Form.Item>

						<Form.Item
							label='Password'
							name='password'
							rules={[
								{
									required: true,
									message: 'Please enter your password',
								},
							]}
						>
							<Input.Password
								prefix={
									<LockOutlined className='site-form-item-icon' />
								}
								placeholder='Please enter your password'
							/>
						</Form.Item>

						<Form.Item {...tailLayout}>
							<Button type='primary' htmlType='submit'>
								Login
							</Button>
						</Form.Item>
					</Form>
				</Col>
			</Row>
			{loginErrorAlert && (
				<Row span={24}>
					<Alert
						message={error || 'Invalid username or password'}
						type='error'
						closable
						afterClose={handleClose}
					/>
				</Row>
			)}
		</div>
	);
};

export default Login;
