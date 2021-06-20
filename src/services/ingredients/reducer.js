import {ActionTypes} from '../actionTypes';

const initialState = {
    ingredientsLoad: false,
    ingredientsLoadSuccess: false,
    ingredientsLoadFailed: false,
    items: [],

    showIngredientDetails: false,
    activeIngredient: null,
}

export const ingredients = (state = initialState, action) => {

    switch (action.type) {

        case  ActionTypes.GET_INGREDIENTS_REQUEST:
            return {
                ...state, 
                ingredientsLoad: true
            };

        case  ActionTypes.GET_INGREDIENTS_SUCCESS:
            return {
                ...state, 
                ingredientsLoad: false, 
                ingredientsLoadSuccess: true, 
                items: action.data
            };

        case  ActionTypes.GET_INGREDIENTS_FAILED:
            return  {
                ...state, 
                ingredientsLoad: false,
                ingredientsLoadFailed: true
            };
            
        case  ActionTypes.SHOW_INGREDIENT_DETAILS:
            return  {
                ...state, 
                showIngredientDetails: action.value
            };

        case  ActionTypes.SET_ACTIVE_INGREDIENT:
            return {
                ...state,
                activeIngredient: action.value
            };

        default: return state;
    }
}