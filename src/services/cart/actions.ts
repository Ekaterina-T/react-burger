/* eslint-disable import/no-cycle */
/* eslint-disable no-underscore-dangle */
import { orderUrl, accessTokenName } from '../../utils/constants';
import { ActionTypes } from '../actionTypes';
import {
  TOrderDetails, TIngredient, TIngredientWithKey, AppThunk, AppDispatch,
} from '../types';
import { getCookie } from '../../utils/cookie';
import { TCartState } from './reducer';

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
export const addIngredientToCart: AppThunk = (ingredientID: string) => (dispatch: AppDispatch, getState) => {
  const getNextIngredientKey = (ingredients: Array<TIngredientWithKey>):number => {
    const maxAvailableIndex = ingredients.reduce(
      (res, item) => {
        const currentKey = Number(item.key.split('_')[1]);
        return res < currentKey ? currentKey : res;
      },
      -1,
    );

    return maxAvailableIndex + 1;
  };

  const getIngredientKey = (ingredient: TIngredient, fillings: TIngredient[]): string => (
    ingredient.type === 'bun'
      ? ingredient._id
      : [ingredient._id, getNextIngredientKey(fillings)].join('_')
  );

  const prevCart = getState().cart;
  const newIngredient = {
    ...getState()
      .ingredients
      .items
      .filter((item: TIngredient) => item._id === ingredientID)[0],
  };

  newIngredient.key = getIngredientKey(newIngredient, prevCart.fillings);

  const updatedCart = (newIngredient.type === 'bun')
    ? { ...prevCart, bun: newIngredient }
    : { ...prevCart, fillings: [...prevCart.fillings, newIngredient] };

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
