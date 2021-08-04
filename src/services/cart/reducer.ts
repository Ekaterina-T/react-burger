import {ActionTypes} from '../actionTypes';
import { TIngredient, TOrderDetails } from '../types';
import { TCartActions } from './actions';

export type TCartState = {
    bun: TIngredient | null,
    fillings: Array<TIngredient>,
    createOrderInProgress?: boolean;
    createOrderSuccess?: boolean;
    createOrderFailed?: boolean;
    showOrderDetails?: boolean;
    orderDetails?: TOrderDetails | null;
}

const initialState: TCartState = {
    bun: null, 
    fillings: [],
    createOrderInProgress: false,
    createOrderSuccess: false,
    createOrderFailed: false,
    showOrderDetails: false,
    orderDetails: null
}

export const cart = (state = initialState, action: TCartActions): TCartState => {
    switch (action.type) {
          
        case  ActionTypes.UPDATE_CART:
            return {
                ...state,
                bun: action.updatedCart.bun,
                fillings: action.updatedCart.fillings
            };

        case  ActionTypes.CREATE_NEW_ORDER_REQUEST:
            return {
                ...state,
                createOrderInProgress: true
            };

        case  ActionTypes.CREATE_NEW_ORDER_SUCCESS:
            return {
                ...state,
                createOrderInProgress: false,
                createOrderSuccess: true,
                orderDetails: action.orderDetails,
                showOrderDetails: true
            };
        
        case  ActionTypes.CREATE_NEW_ORDER_FAILED:
            return {
                ...state,
                createOrderInProgress: false,
                createOrderFailed: true
            };
        
        case  ActionTypes.CLOSE_ORDER: 
            return {
                ...state,
                createOrderSuccess: false,
                showOrderDetails: false,
                orderDetails: null,
                bun: null, 
                fillings: []
            };
        
        default: return state;
    }
}