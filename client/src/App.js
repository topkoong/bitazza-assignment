import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Routes from './routing/Routes';
import { Layout } from 'antd';
import { Navbar } from './components/layout/Navbar';
import AuthState from './context/auth/AuthState';
import MarketState from './context/market/MarketState';

function App() {
	return (
		<AuthState>
			<MarketState>
				<Router>
					<Layout style={{ minHeight: '100vh', overflowX: 'hidden' }}>
						<Navbar />
						<Switch>
							<Route component={Routes} />
						</Switch>
					</Layout>
				</Router>
			</MarketState>
		</AuthState>
	);
}

export default App;
