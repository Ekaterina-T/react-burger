import { combineReducers } from 'redux';

import {ingredients} from './ingredients/reducer';
import {cart} from './cart/reducer';
import {user} from './user/reducer';
import {orders} from './orders/reducer';


export const rootReducer = combineReducers({
    ingredients,
    cart,
    user,
    orders
});