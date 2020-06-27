const WS_ENDPOINT = process.env.REACT_APP_WS_ENDPOINT;
const messageType = {
	request: 0,
	reply: 1,
	subscribe: 2,
	event: 3,
	unsubscribe: 4,
	error: 5,
};
const functionType = {
	login: 'WebAuthenticateUser',
	logout: 'LogOut',
	subscribe: 'SubscribeLevel2',
	unsubscribe: 'UnsubscribeLevel2',
};
const handleFunctionType = (type) => {
	return functionType[type];
};

let ws = null;
const setWs = () => {
	ws = new WebSocket(`${WS_ENDPOINT}`);
};

const getWs = () => ws;

const constructMessage = (msgType, funcType, payload) => {
	const message = {
		m: msgType,
		i: 0,
		n: funcType,
		o: JSON.stringify(payload),
	};
	return JSON.stringify(message);
};

export const handleMessageFrame = (messageFrame) =>
	constructMessage(
		messageType[messageFrame.type],
		handleFunctionType(messageFrame.functionType),
		messageFrame.payload
	);

const webSocketController = (message) => {
	message.functionType === 'login' && setWs();
	const webSocket = getWs();
	if (webSocket) {
		webSocket.onopen = () => {
			const messageFrame = handleMessageFrame(message);
			webSocket.send(messageFrame);
		};
		webSocket.onclose = () => {
			webSocket.close();
		};
	}
	return webSocket;
};

export default webSocketController;
