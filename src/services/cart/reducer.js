import {ActionTypes} from '../actionTypes';

const initialState = {
    bun: null, 
    fillings: [],

    createOrder: false,
    createOrderSuccess: false,
    createOrderFailed: false,
    showOrderDetails: false,
    orderDetails: null
}

export const cart = (state = initialState, action) => {

    switch (action.type) {
          
        case  ActionTypes.UPDATE_CART:
            return {
                ...state,
                bun: action.updatedCart.bun,
                fillings: action.updatedCart.fillings
            };
         
        case  ActionTypes.CLEAR_CART:
            return {
                ...state,
                bun: null,
                fillings: []
            };

        case  ActionTypes.CREATE_NEW_ORDER_REQUEST:
            return {
                ...state,
                createOrder: true
            };

        case  ActionTypes.CREATE_NEW_ORDER_SUCCESS:
            return {
                ...state,
                createOrder: false,
                createOrderSuccess: true,
                orderDetails: action.orderDetails,
                showOrderDetails: true
            };
        
        case  ActionTypes.CREATE_NEW_ORDER_FAILED:
            return {
                ...state,
                createOrder: false,
                createOrderFailed: true
            };
        
        case  ActionTypes.CLOSE_ORDER: 
            return {
                ...state,
                showOrderDetails: false,
                bun: null, 
                fillings: []
            };
        
        default: return state;
    }
}