import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Layout } from 'antd';
import Login from '../components/auth/Login';
import Main from '../pages/Main';
import PrivateRoute from './PrivateRoute';
import NotFound from '../pages/NotFound';
const { Content } = Layout;
const Routes = () => {
	return (
		<Content className='px-20 p-20'>
			<Switch>
				<PrivateRoute exact path='/' component={Main} />
				<Route exact path='/login' component={Login} />
				<Route exact path='*' component={NotFound} />
			</Switch>
		</Content>
	);
};

export default Routes;
