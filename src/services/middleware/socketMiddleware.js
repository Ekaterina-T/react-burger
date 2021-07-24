import { accessTokenName } from "../../utils/constants";
import { ActionTypes } from "../actionTypes";
import { getCookieValue } from "../../utils/cookie";
import { allOrdersWS, personalOrdersWS } from "../../utils/constants";

const createSocket = (type) => {

  let socket,
      wsActions;

  if (type === ActionTypes.wsAllOrders.wsInit) {
    socket = new WebSocket(allOrdersWS);
    wsActions = ActionTypes.wsAllOrders;
  }

  if (type === ActionTypes.wsUserOrders.wsInit && getCookieValue(accessTokenName)) {
    socket = new WebSocket(`${personalOrdersWS}?token=${getCookieValue(accessTokenName)}`);
    wsActions = ActionTypes.wsUserOrders;
  }

  return [socket, wsActions]

}

export const socketMiddleware = () => {

    return store => {
  
      return next => action => {
        const { dispatch } = store;
        const { type, payload } = action;
        const [socket, wsActions] = createSocket(type);

        if (socket) {

          socket.onopen = event => {
            dispatch({ type: wsActions.onOpen, payload: event });
          };
  
          socket.onerror = event => {
            dispatch({ type: wsActions.onError, payload: event });
          };
  
          socket.onmessage = event => {
            const { data } = event;
            dispatch({ type: wsActions.onGetMessage, payload: data  });
          };

          socket.onclose = event => {
            dispatch({ type: wsActions.onClose, payload: event });
          };
  
          if (type === wsActions.wsSendMessage) {
            const message = payload;
            socket.send(JSON.stringify(message));
          }
        }
        next(action);
      };
    };

}; 