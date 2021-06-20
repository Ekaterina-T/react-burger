import {dataUrl} from '../../utils/constants';
//import {ingredients} from '../utils/data'

import {ActionTypes} from '../actionTypes';

export const getIngredientData = () => {

    return dispatch => {

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

