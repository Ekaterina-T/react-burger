import { ActionTypes } from "../actionTypes";
  
const initialState = {
    'allOrdersWS': {
        wsConnected: false,
        error: null,
        messages: [],
        data: null
    },
    'personalOrdersWS': {
        wsConnected: false,
        error: null,
        messages: [],
        data: null
    },
};

export const orders = (state = initialState, action) => {

    switch (action.type) {

        case ActionTypes.WS_CONNECTION_SUCCESS:
        return {
            ...state,
            [action.socketType]: {
                ...state[action.socketType],
                error: null,
                wsConnected: true
            }
        };

        case ActionTypes.WS_CONNECTION_ERROR:
        return {
            ...state,
            [action.socketType]: {
                ...state[action.socketType],
                error: action.payload,
                wsConnected: false
            }
        };

        case ActionTypes.WS_CONNECTION_CLOSED:
        return {
            ...state,
            [action.socketType]: {
                ...state[action.socketType],
                error: null,
                wsConnected: false
            }
        };

        case ActionTypes.WS_GET_MESSAGE:
        return {
            ...state,
            [action.socketType]: {
                ...state[action.socketType],
                error: null,
                data: JSON.parse(action.payload),
                messages: [...state[action.socketType].messages, JSON.parse( action.payload)]
            }
        };
        default:
        return state;
    }
}; 
