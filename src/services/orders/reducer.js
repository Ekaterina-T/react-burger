import { ActionTypes } from "../actionTypes";
  
const initialState = {
    wsConnected: false,
    error: null,
    messages: [],
    data: null
};

export const orders = (state = initialState, action) => {

    switch (action.type) {

        case ActionTypes.WS_CONNECTION_SUCCESS:
        return {
            ...state,
            error: null,
            wsConnected: true
        };

        case ActionTypes.WS_CONNECTION_ERROR:
        return {
            ...state,
            error: action.payload,
            wsConnected: false
        };

        case ActionTypes.WS_CONNECTION_CLOSED:
        return {
            ...state,
            error: null,
            wsConnected: false
        };

        case ActionTypes.WS_GET_MESSAGE:
        return {
            ...state,
            error: null,
            data: JSON.parse( action.payload),
            messages: [...state.messages, JSON.parse( action.payload)]
        };
        default:
        return state;
    }
}; 
