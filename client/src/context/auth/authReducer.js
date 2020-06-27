import {
	USER_LOADED,
	CLEAR_ERRORS,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	LOGOUT,
} from '../types';

export default (state, action) => {
	switch (action.type) {
		case USER_LOADED:
			return {
				...state,
				loading: false,
				user: action.payload,
			};
		case LOGIN_SUCCESS:
			localStorage.setItem('sessionToken', action.payload.SessionToken);
			return {
				...state,
				...action.payload,
				isAuthenticated: true,
				loading: false,
			};
		case LOGIN_FAIL:
			return {
				...state,
				sessionToken: null,
				isAuthenticated: false,
				loading: false,
				user: null,
				error: action.payload,
			};
		case LOGOUT:
			localStorage.removeItem('sessionToken');
			localStorage.clear();
			return {
				...state,
				sessionToken: null,
				isAuthenticated: false,
				loading: false,
				user: null,
			};
		case CLEAR_ERRORS:
			return {
				...state,
				error: null,
			};
		default:
			return state;
	}
};
