import {
	GET_MARKETS,
	GET_MARKETS_ERROR,
	UNSUBSCRIBE_MARKETS,
	UNSUBSCRIBE_MARKETS_ERROR,
} from '../types';
export default (state, action) => {
	switch (action.type) {
		case GET_MARKETS:
			return {
				...state,
				markets: action.payload,
				loading: false,
			};
		case GET_MARKETS_ERROR:
			return {
				...state,
				markets: null,
				loading: false,
				error: action.payload,
			};
		case UNSUBSCRIBE_MARKETS:
			return {
				...state,
				loading: false,
				...action.payload,
			};
		case UNSUBSCRIBE_MARKETS_ERROR:
			return {
				...state,
				loading: false,
				error: action.payload,
			};
		default:
			return state;
	}
};
