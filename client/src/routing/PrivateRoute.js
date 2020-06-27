import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthContext from '../context/auth/authContext';
import { Space, Spin } from 'antd';
const PrivateRoute = ({ component: Component, ...rest }) => {
	const authContext = useContext(AuthContext);
	const { isAuthenticated } = authContext;
	return (
		<Route
			{...rest}
			render={(props) =>
				isAuthenticated ? (
					<Component {...props} />
				) : (
					<Redirect to='/login' />
				)
			}
		/>
	);
};

export default PrivateRoute;
