import { ActionTypes } from "../actionTypes";
import { socketType } from "../../utils/constants";
import { TWSOrderActions, IWSOnError_AllOrders, 
         IWSOnError_UserOrders, 
         IWSOnGetMessage_AllOrders, IWSOnGetMessage_UserOrders} from "./actions";

export type TSocketState = {
    wsConnected: boolean;
    error: object | null;
    messages: Array<object>;
    data: object | null;
};

export type TAllSocketsState = {
    [name: string]: TSocketState
}

const initialState: TAllSocketsState = {};

for(let socket in socketType) {
    initialState[socketType[socket]] = {
        wsConnected: false,
        error: null,
        messages: [],
        data: null
    }
};

const wsInit = (state: TAllSocketsState, action: TWSOrderActions, socketName: string) => ({
    ...state,
    [socketName]: {
        ...state[socketName],
        error: null,
        wsConnected: true
    }
});

const onError = (state: TAllSocketsState, action: IWSOnError_AllOrders | IWSOnError_UserOrders, socketName: string) => ({
    ...state,
    [socketName]: {
        ...state[socketName],
        error: action.payload,
        wsConnected: false
    }
});

const onClose = (state: TAllSocketsState, action: TWSOrderActions, socketName: string) => ({
    ...state,
    [socketName]: {
        ...state[socketName],
        error: null,
        wsConnected: false
    }
});

const onGetMessage = (state: TAllSocketsState, action: IWSOnGetMessage_AllOrders | IWSOnGetMessage_UserOrders, socketName: string) => ({
    ...state,
    [socketName]: {
        ...state[socketName],
        error: null,
        data: JSON.parse(action.payload),
        messages: [...state[socketName].messages, JSON.parse(action.payload)]
    } 
});

export const orders = (state = initialState, action: TWSOrderActions) => {

    switch (action.type) {

        case ActionTypes.wsAllOrders.onOpen:
        case ActionTypes.wsUserOrders.onOpen:
            return wsInit(state, action, action.socketName);

        case ActionTypes.wsAllOrders.onError:
        case ActionTypes.wsUserOrders.onError:
            return onError(state, action, action.socketName);

        case ActionTypes.wsAllOrders.onClose:
        case ActionTypes.wsUserOrders.onClose:
            return onClose(state, action, action.socketName);

        case ActionTypes.wsAllOrders.onGetMessage:
        case ActionTypes.wsUserOrders.onGetMessage:
            return onGetMessage(state, action, action.socketName);

        default:
        return state;
    }
}; 
