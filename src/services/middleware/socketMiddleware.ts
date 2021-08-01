import { accessTokenName, allOrdersWS, personalOrdersWS  } from "../../utils/constants";
import { ActionTypes, TWSUserOrders, TWSAllOrders } from "../actionTypes";
import { getCookieValue } from "../../utils/cookie";
import { RootState } from "../types";
import { Middleware } from 'redux'


const createSocket = (type: string): [socket: WebSocket, wsActions: TWSAllOrders|TWSUserOrders] => {

  if (type === ActionTypes.wsAllOrders.wsInit) {
    return [new WebSocket(allOrdersWS), ActionTypes.wsAllOrders];
  }

  if (type === ActionTypes.wsUserOrders.wsInit && getCookieValue(accessTokenName)) {
    return [new WebSocket(`${personalOrdersWS}?token=${getCookieValue(accessTokenName)}`), ActionTypes.wsUserOrders];
  }

  throw new Error('Couldn\'t create socket of type '+ type);
}

export const socketMiddleware: Middleware<{}, RootState> = 

  store => next => action => {
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