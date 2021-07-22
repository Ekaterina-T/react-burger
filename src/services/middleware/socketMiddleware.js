import { ActionTypes } from "../actionTypes";

export const socketMiddleware = (wsUrl, socketType) => {

    return store => {
      let socket = null;
  
      return next => action => {
        const { dispatch, getState } = store;
        const { type, payload } = action;

        if (type === ActionTypes.WS_CONNECTION_START) {
          socket = new WebSocket(wsUrl);
        }
        if (socket) {

          socket.onopen = event => {
            dispatch({ type: ActionTypes.WS_CONNECTION_SUCCESS, payload: event, socketType: socketType });
          };
  
          socket.onerror = event => {
            dispatch({ type: ActionTypes.WS_CONNECTION_ERROR, payload: event, socketType: socketType });
          };
  
          socket.onmessage = event => {
            const { data } = event;
            dispatch({ type: ActionTypes.WS_GET_MESSAGE, payload: data, socketType: socketType });
          };

          socket.onclose = event => {
            dispatch({ type: ActionTypes.WS_CONNECTION_CLOSED, payload: event, socketType: socketType });
          };
  
          if (type === ActionTypes.WS_SEND_MESSAGE) {
            const message = payload;
            socket.send(JSON.stringify(message));
          }
        }
  
        next(action);
      };
    };
}; 