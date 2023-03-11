/* eslint-disable import/no-cycle */
import { Middleware } from 'redux';
import {
  accessTokenName, allOrdersWS, personalOrdersWS, socketType,
} from '../../utils/constants';
import { ActionTypes, TWSUserOrders, TWSAllOrders } from '../actionTypes';
import { getCookieValue } from '../../utils/cookie';
import { RootState } from '../types';

const createSocket = (type: string): [
  socket: WebSocket | null,
  wsActions: TWSAllOrders | TWSUserOrders | null,
  socketName: string | null] => {
  if (type === ActionTypes.wsAllOrders.wsInit) {
    return [new WebSocket(allOrdersWS), ActionTypes.wsAllOrders, socketType.allOrders];
  }

  if (type === ActionTypes.wsUserOrders.wsInit && getCookieValue(accessTokenName)) {
    return [new WebSocket(`${personalOrdersWS}?token=${getCookieValue(accessTokenName)}`), ActionTypes.wsUserOrders, socketType.personalOrders];
  }

  return [null, null, null];
};

const socketMiddleware: Middleware<{}, RootState> = (store) => (next) => (action) => {
  const { dispatch } = store;
  const { type, payload } = action;
  const [socket, wsActions, socketName] = createSocket(type);

  if (socket !== null && wsActions !== null) {
    socket.onopen = (event) => {
      dispatch({ type: wsActions.onOpen, payload: event, socketName });
    };

    socket.onerror = (event) => {
      dispatch({ type: wsActions.onError, payload: event, socketName });
    };

    socket.onmessage = (event) => {
      const { data } = event;
      dispatch({ type: wsActions.onGetMessage, payload: data, socketName });
    };

    socket.onclose = (event) => {
      dispatch({ type: wsActions.onClose, payload: event, socketName });
    };

    if (type === wsActions.wsSendMessage) {
      const message = payload;
      socket.send(JSON.stringify(message));
    }
  }
  next(action);
};

export default socketMiddleware;
