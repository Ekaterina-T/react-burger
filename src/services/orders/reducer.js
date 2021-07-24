import { ActionTypes } from "../actionTypes";
import { socketType } from "../../utils/constants";

const initialState = {};

for(let socket in socketType) {
    initialState[socketType[socket]] = {
        wsConnected: false,
        error: null,
        messages: [],
        data: null
    }
};

const wsInit = (state, action, socket) => ({
    ...state,
    [socket]: {
        ...state[socket],
        error: null,
        wsConnected: true
    }
});

const onError = (state, action, socket) => ({
    ...state,
    [socket]: {
        ...state[socket],
        error: action.payload,
        wsConnected: false
    }
});

const onClose = (state, action, socket) => ({
    ...state,
    [socket]: {
        ...state[socket],
        error: null,
        wsConnected: false
    }
});

const onGetMessage = (state, action, socket) => ({
    ...state,
    [socket]: {
        ...state[socket],
        error: null,
        data: JSON.parse(action.payload),
        messages: [...state[socket].messages, JSON.parse(action.payload)]
    } 
});

const getSocketType = (action) => {

    if(action.type.indexOf('ALL_ORDERS')>0) {
        return socketType.allOrders;
    }

    if(action.type.indexOf('USER_ORDERS')>0) {
        return socketType.personalOrders;
    }

    return null;
}

export const orders = (state = initialState, action) => {

    const socket = getSocketType(action);

    switch (action.type) {

        case ActionTypes.wsAllOrders.onOpen:
        case ActionTypes.wsUserOrders.onOpen:
            return wsInit(state, action, socket);

        case ActionTypes.wsAllOrders.onError:
        case ActionTypes.wsUserOrders.onError:
            return onError(state, action, socket);

        case ActionTypes.wsAllOrders.onClose:
        case ActionTypes.wsUserOrders.onClose:
            return onClose(state, action, socket);

        case ActionTypes.wsAllOrders.onGetMessage:
        case ActionTypes.wsUserOrders.onGetMessage:
            return onGetMessage(state, action, socket);

        default:
        return state;
    }
}; 
