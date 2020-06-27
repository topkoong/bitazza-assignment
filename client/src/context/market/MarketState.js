import React, { useReducer } from 'react';
import MarketContext from './marketContext';
import marketReducer from './marketReducer';
import {
	GET_MARKETS,
	GET_MARKETS_ERROR,
	UNSUBSCRIBE_MARKETS,
	UNSUBSCRIBE_MARKETS_ERROR,
} from '../types';
import webSocketController, {
	handleMessageFrame,
} from '../webSocketController';

const MarketState = (props) => {
	const initialState = {
		markets: [],
		error: null,
	};
	const [state, dispatch] = useReducer(marketReducer, initialState);

	const getMarkets = () => {
		try {
			const payload = {
				OMSId: 1,
				InstrumentId: 1,
				Depth: 250,
			};
			const message = {
				type: 'request',
				functionType: 'subscribe',
				payload,
			};
			const ws = webSocketController(message);
			const messageFrame = handleMessageFrame(message);
			ws.send(messageFrame);
			ws.onmessage = (event) => {
				const response = JSON.parse(event.data);
				const res = response && response.o && JSON.parse(response.o);
				if (res) {
					dispatch({
						type: GET_MARKETS,
						payload: res,
					});
				} else {
					dispatch({
						type: GET_MARKETS_ERROR,
						payload: res,
					});
				}
			};
		} catch (err) {
			dispatch({
				type: GET_MARKETS_ERROR,
				payload: err.message,
			});
		}
	};
	const unsubscribeMarkets = () => {
		try {
			const payload = {
				OMSId: 1,
				InstrumentId: 1,
			};
			const message = {
				type: 'request',
				functionType: 'unsubscribe',
				payload,
			};
			const ws = webSocketController(message);
			const messageFrame = handleMessageFrame(message);
			ws.send(messageFrame);
			ws.onmessage = (event) => {
				const response = JSON.parse(event.data);
				const res = response && response.o && JSON.parse(response.o);
				if (res && res.result) {
					dispatch({
						type: UNSUBSCRIBE_MARKETS,
						payload: res,
					});
				} else {
					dispatch({
						type: UNSUBSCRIBE_MARKETS_ERROR,
						payload: res && res.errormsg,
					});
				}
			};
		} catch (err) {
			dispatch({
				type: UNSUBSCRIBE_MARKETS_ERROR,
				payload: err.message,
			});
		}
	};

	return (
		<MarketContext.Provider
			value={{
				loading: state.loading,
				markets: state.markets,
				error: state.error,
				getMarkets,
				unsubscribeMarkets,
			}}
		>
			{props.children}
		</MarketContext.Provider>
	);
};

export default MarketState;
