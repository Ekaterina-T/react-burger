import {dataUrl} from '../../utils/constants';
//import {ingredients} from '../utils/data'

import {ActionTypes} from '../actionTypes';
import { TIngredient } from '../types';
import { AppThunk, AppDispatch } from '../types';

export interface IGetIngredientsRequest {
    readonly type: typeof ActionTypes.GET_INGREDIENTS_REQUEST;
}

export interface IGetIngredientsSuccess {
    readonly type: typeof ActionTypes.GET_INGREDIENTS_SUCCESS;
    readonly data: Array<TIngredient>;
}

export interface IGetIngredientsFailed {
    readonly type: typeof ActionTypes.GET_INGREDIENTS_FAILED;
}

export interface IShowIngredientsDetails {
    readonly type: typeof ActionTypes.SHOW_INGREDIENT_DETAILS;
    readonly value: boolean;
}

export interface ISetActiveIngredient {
    readonly type: typeof ActionTypes.SET_ACTIVE_INGREDIENT;
    readonly value: TIngredient;
}

export type TIngredientActions = 
| IGetIngredientsRequest
| IGetIngredientsSuccess
| IGetIngredientsFailed
| IShowIngredientsDetails
| ISetActiveIngredient;


export const getIngredientData: AppThunk = () => {

    return (dispatch: AppDispatch) => {

        dispatch({type: ActionTypes.GET_INGREDIENTS_REQUEST});

        fetch(dataUrl)
        .then(res => res.ok ? res.json() : Promise.reject(res.statusText))
        .then(res => {
            dispatch({type:  ActionTypes.GET_INGREDIENTS_SUCCESS, data: res.data});
        })
        .catch( e => {
            dispatch({type:  ActionTypes.GET_INGREDIENTS_FAILED});     
        });

    }
};

