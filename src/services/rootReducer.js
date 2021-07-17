import { combineReducers } from 'redux';

import {ingredients} from './ingredients/reducer';
import {cart} from './cart/reducer';
import {user} from './user/reducer';


export const rootReducer = combineReducers({
    ingredients,
    cart,
    user
});