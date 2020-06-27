import React, { useReducer } from 'react';
import axios from 'axios';
import AuthContext from './authContext';
import authReducer from './authReducer';
import {
	USER_LOADED,
	CLEAR_ERRORS,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	LOGOUT,
	LOGOUT_FAIL,
} from '../types';
import webSocketController, {
	handleMessageFrame,
} from '../webSocketController';

const AuthState = (props) => {
	const initialState = {
		sessionToken: localStorage.getItem('sessionToken'),
		isAuthenticated: false,
		loading: false,
		user: null,
		error: null,
	};
	const API = process.env.REACT_APP_API;

	const setAuthToken = (sessionToken) => {
		if (sessionToken) {
			localStorage.setItem('sessionToken', sessionToken);
		} else {
			localStorage.removeItem('sessionToken');
		}
	};

	const [state, dispatch] = useReducer(authReducer, initialState);

	// Load User
	const loadUser = (userId, userName) => {
		setAuthToken(localStorage.getItem('sessionToken'));
		// set user
		if (userId && userName) {
			dispatch({
				type: USER_LOADED,
				payload: { userId, userName },
			});
		}
	};

	const storeToDb = (userName) => {
		console.log('inboked');
		// store to db
		const authKey = process.env.REACT_APP_AUTH_KEY;
		const authValue = process.env.REACT_APP_AUTH_VALUE;
		const header = {};
		header[authKey] = authValue;
		const options = {
			headers: header,
		};
		axios.post(
			`${API}/logs/userlogs`,
			{
				email: userName,
			},
			options
		);
	};
	// Login User
	const login = (formData) => {
		try {
			const message = {
				type: 'request',
				functionType: 'login',
				payload: formData,
			};
			const ws = webSocketController(message);
			if (ws) {
				ws.onmessage = (event) => {
					const response = JSON.parse(event.data);
					const res =
						response && response.o && JSON.parse(response.o);
					if (res && res.Authenticated) {
						dispatch({
							type: LOGIN_SUCCESS,
							payload: res,
						});
						// store login log to db
						const userName = formData && formData.username;
						const userId = res.UserId;
						storeToDb(userName);
						loadUser(userId, userName);
					} else {
						dispatch({
							type: LOGIN_FAIL,
							payload: res && res.errormsg,
						});
					}
				};
			}
		} catch (err) {
			dispatch({
				type: LOGIN_FAIL,
				payload: err.message,
			});
		}
	};

	// Logout
	const logout = async () => {
		try {
			const message = {
				type: 'request',
				functionType: 'logout',
				payload: {},
			};
			const ws = webSocketController(message);
			const messageFrame = handleMessageFrame(message);
			ws.send(messageFrame);
			if (ws) {
				ws.onmessage = (event) => {
					const response = JSON.parse(event.data);
					const res =
						response && response.o && JSON.parse(response.o);
					if (res && res.result) {
						dispatch({
							type: LOGOUT,
							payload: res,
						});
					} else {
						dispatch({
							type: LOGOUT_FAIL,
							payload: res && res.errormsg,
						});
					}
				};
			}
		} catch (err) {
			dispatch({
				type: LOGIN_FAIL,
				payload: err.message,
			});
		}
	};
	// Clear Errors
	const clearErrors = () => dispatch({ type: CLEAR_ERRORS });
	// set token on initial app loading
	const existingTokens = state.sessionToken;

	// load user on first run or refresh
	existingTokens && loadUser(state.userId, state.userName);
	return (
		<AuthContext.Provider
			value={{
				sessionToken: state.sessionToken,
				isAuthenticated: state.isAuthenticated,
				loading: state.loading,
				user: state.user,
				error: state.error,
				clearErrors,
				loadUser,
				login,
				logout,
			}}
		>
			{props.children}
		</AuthContext.Provider>
	);
};

export default AuthState;
