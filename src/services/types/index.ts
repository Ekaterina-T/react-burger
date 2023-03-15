/* eslint-disable import/no-cycle */
import { ThunkAction } from 'redux-thunk';
import { ActionCreator } from 'redux';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Location } from 'history';
import { store } from '../store';

import { TCartActions } from '../cart/actions';
import { TIngredientActions } from '../ingredients/actions';
import { TWSOrderActions } from '../orders/actions';
import { TUserActions } from '../user/actions';

import rootReducer from '../rootReducer';

export interface ILocation extends Location {
  background?: any;
}

export type TNavItem = {
  id: string;
  title: string;
  to?: string;
  icon?: any;
  cssClass?: string;
  subitems?: Array<{ id: string, title: string }>;
};

export type TIngredient = {
  _id: string;
  name: string;
  type: 'bun' | 'sauce' | 'main';
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
  key: string;
};

export type TOrder = {
  _id: string;
  name: string;
  number: number;
  ingredients: string[];
  updatedAt: string;
  status: string;
};

export type TIngredientGroup = {
  type: 'bun' | 'sauce' | 'main';
  name?: string;
};

export type TIngredientWithKey = TIngredient & {
  key: string;
};

export type TOrderIngredients = {
  bun: TIngredient;
  fillings: Array<TIngredient>;
};

export type TOrderDetails = {
  success: boolean;
  order: { number: number };
};

export type TSocketList = {
  [name:string]: string;
};

// export type RootState = ReturnType<typeof store.getState>;
export type RootState = ReturnType<typeof rootReducer>;

type TApplicationActions = TCartActions & TIngredientActions & TWSOrderActions & TUserActions;

export type AppDispatch = typeof store.dispatch;

// eslint-disable-next-line max-len
export type AppThunk<TReturn = void> = ActionCreator< ThunkAction<TReturn, RootState, unknown, TApplicationActions> >;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch | AppThunk>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
