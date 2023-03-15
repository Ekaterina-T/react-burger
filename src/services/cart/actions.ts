/* eslint-disable import/no-cycle */
/* eslint-disable no-underscore-dangle */
import { orderUrl, accessTokenName } from '../../utils/constants';
import { ActionTypes } from '../actionTypes';
import {
  TOrderDetails, TIngredient, AppThunk, AppDispatch,
} from '../types';
import { getCookie } from '../../utils/cookie';
import { TCartState } from './reducer';
import CartActions from './CartActions';

export interface IUpdateCart {
  readonly type: typeof ActionTypes.UPDATE_CART;
  readonly updatedCart: TCartState;
}

export interface ICreateNewOrderRequest {
  readonly type: typeof ActionTypes.CREATE_NEW_ORDER_REQUEST
}

export interface ICreateNewOrderSuccess {
  readonly type: typeof ActionTypes.CREATE_NEW_ORDER_SUCCESS;
  readonly orderDetails: TOrderDetails;
}

export interface ICreateNewOrderFailed {
  readonly type: typeof ActionTypes.CREATE_NEW_ORDER_FAILED
}

export interface ICloseOrder {
  readonly type: typeof ActionTypes.CLOSE_ORDER
}

export type TCartActions =
| IUpdateCart
| ICreateNewOrderFailed
| ICreateNewOrderRequest
| ICreateNewOrderSuccess
| ICloseOrder;

// eslint-disable-next-line max-len
export const addIngredientToCart: AppThunk = (ingredientID: string, positionIndex: number | null = null) => (dispatch: AppDispatch, getState) => {
  const newIngredient = CartActions.createNewIngredient(
    getState().ingredients.items,
    ingredientID,
  );
  const updatedCart = { ...getState().cart };
  if (newIngredient.type === 'bun') {
    // buns are the same => we need info about only one bun
    updatedCart.bun = newIngredient;
  } else if (!updatedCart.fillings.length) {
    // no fillings => no re-order of the fillings
    updatedCart.fillings.push(newIngredient);
  } else if (positionIndex === null) {
    // some fillings defined, but new one has no special position => no re-order
    updatedCart.fillings.push(newIngredient);
  } else {
    // there are fillings and position of the new one is defined explicitly
    const updatedFillings = [...updatedCart.fillings];
    updatedFillings.splice(positionIndex, 0, newIngredient);
    updatedCart.fillings = updatedFillings;
  }

  dispatch({ type: ActionTypes.UPDATE_CART, updatedCart });
};

// eslint-disable-next-line max-len
export const removeIngredientFromCart: AppThunk = (ingredientKey: string) => (dispatch: AppDispatch, getState) => {
  const prevCart = getState().cart;
  const removedIngredientIndex = prevCart
    .fillings
    .findIndex((item: TIngredient) => item.key === ingredientKey);
  const updatedFillings = [...prevCart.fillings];

  updatedFillings.splice(removedIngredientIndex, 1);

  dispatch({
    type: ActionTypes.UPDATE_CART,
    updatedCart: { ...prevCart, fillings: updatedFillings },
  });
};

export const createOrder: AppThunk = () => (dispatch: AppDispatch, getState) => {
  dispatch({ type: ActionTypes.CREATE_NEW_ORDER_REQUEST });

  const prevCart: TCartState = getState().cart;
  const { bun, fillings } = { ...prevCart };

  fetch(orderUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: getCookie(accessTokenName),
    },
    body: JSON.stringify({ ingredients: [...fillings, bun, bun].map((item) => item && item._id) }),
  })
    .then((res) => (res.ok ? res.json() : Promise.reject(res)))
    .then((res) => {
      dispatch({ type: ActionTypes.CREATE_NEW_ORDER_SUCCESS, orderDetails: res });
    })
    .catch(() => {
      dispatch({ type: ActionTypes.CREATE_NEW_ORDER_FAILED });
    });
};

// eslint-disable-next-line max-len
export const sortFillingsOrder: AppThunk = (oldItemIndex: number, newItemIndex: number) => (dispatch: AppDispatch, getState) => {
  const prevCart = getState().cart;
  const newFillings = [...prevCart.fillings];

  const itemToMove = newFillings[oldItemIndex];
  newFillings.splice(oldItemIndex, 1);
  newFillings.splice(newItemIndex, 0, itemToMove);

  const updatedCart = { ...prevCart, fillings: newFillings };

  dispatch({ type: ActionTypes.UPDATE_CART, updatedCart });
};
