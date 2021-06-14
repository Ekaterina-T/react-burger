//import { combineReducers } from 'redux';

import {
    GET_INGREDIENTS, 
    GET_INGREDIENTS_SUCCESS, 
    GET_INGREDIENTS_FAILED, 

    SHOW_INGREDIENT_DETAILS,
    SET_ACTIVE_INGREDIENT,

    UPDATE_CART, 
    CREATE_NEW_ORDER,
    CREATE_NEW_ORDER_SUCCESS,
    CREATE_NEW_ORDER_FAILED,
    SHOW_ORDER_DETAILS
} from './actions'


const initialState = {
    ingredients_load: false,
    ingredients_load_success: false,
    ingredients_load_failed: false,
    ingredients: [],

    showIngredientDetails: false,
    activeIngredient: null,

    cart: {bun: null, fillings: []},

    create_order: false,
    create_order_success: false,
    create_order_failed: false,
    showOrderDetails: false,
    orderDetails: null
}

export const rootReducer = (state = initialState, action) => {

    switch (action.type) {

        case GET_INGREDIENTS:
            return {
                ...state, 
                ingredients_load: true
            };

        case GET_INGREDIENTS_SUCCESS:
            return {
                ...state, 
                ingredients_load: false, 
                ingredients_load_success: true, 
                ingredients: action.data
            };

        case GET_INGREDIENTS_FAILED:
            return  {
                ...state, 
                ingredients_load: false,
                ingredients_load_failed: true
            };
            
        case SHOW_INGREDIENT_DETAILS:
            return  {
                ...state, 
                showIngredientDetails: action.value
            };

        case SET_ACTIVE_INGREDIENT:
            return {
                ...state,
                activeIngredient: action.value
            };
          
        case UPDATE_CART:
            return {
                ...state,
                cart: action.updatedCart
            };

        case CREATE_NEW_ORDER:
            return {
                ...state,
                create_order: true
            };

        case CREATE_NEW_ORDER_SUCCESS:
            return {
                ...state,
                create_order: false,
                create_order_success: true,
                orderDetails: action.orderDetails
            };
        
        case CREATE_NEW_ORDER_FAILED:
            return {
                ...state,
                create_order: false,
                create_order_failed: true
            };
        
        case SHOW_ORDER_DETAILS: 
            return {
                ...state,
                showOrderDetails: action.value
            };
        
        default: return state;
    }
}