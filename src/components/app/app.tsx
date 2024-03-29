import React from 'react';
import {
  Route, Switch, useLocation, useHistory,
} from 'react-router-dom';

import { useAppSelector, useAppDispatch, ILocation } from '../../services/types';

import './app.css';

import AppHeader from '../app-header/app-header';
import RouteForAuthorizedUsers from '../route-auth-users/route-auth-users';
import RouteForUnauthorizedUsers from '../route-unauth-users/route-unauth-users';
import {
  MainPage,
  LoginPage,
  RegisterPage,
  ForgotPasswordPage,
  ResetPasswordPage,
  ProfilePage,
  FeedPage,
  NotFoundPage,
  OrderInfoPage,
} from '../../pages';
import IngredientDetails from '../ingredient-details/ingredient-details';

import { getIngredientData } from '../../services/ingredients/actions';
import { refreshUser, logout } from '../../services/user/actions';
import { ActionTypes } from '../../services/actionTypes';

import useIdleTimeout from '../../hooks/useIdleTimeout';
import { MILLISECONDS_IN_MINUTE } from '../../utils/date-formatter/date-formatter';

function App() {
  const dispatch = useAppDispatch();
  const { ingredientsLoadSuccess } = useAppSelector((store) => store.ingredients);
  const { loginSuccess } = useAppSelector((store) => store.user);
  const isUserActive = useIdleTimeout(MILLISECONDS_IN_MINUTE * 15);

  const location = useLocation<ILocation>();
  const history = useHistory();
  const background = history.action === 'PUSH' && location.state && location.state.background;

  React.useEffect(() => {
    dispatch(getIngredientData());
    dispatch(refreshUser());
    dispatch({ type: ActionTypes.wsAllOrders.wsInit });
  }, [dispatch]);

  React.useEffect(() => {
    if (loginSuccess) {
      dispatch({ type: ActionTypes.wsUserOrders.wsInit });
    }
  }, [dispatch, loginSuccess]);

  React.useEffect(() => {
    if (loginSuccess && !isUserActive) {
      dispatch(logout());
    }
  }, [dispatch, isUserActive, loginSuccess]);

  if (!ingredientsLoadSuccess) {
    return <p> Данные загружаются </p>;
  }

  return (

    <>
      <AppHeader />
      <main>
        <Switch location={background || location}>

          <Route exact path="/"><MainPage /></Route>
          <Route exact path="/ingredients/:id"><IngredientDetails /></Route>
          <Route exact path="/feed/:id"><OrderInfoPage /></Route>
          <Route exact path="/feed"><FeedPage /></Route>
          <RouteForAuthorizedUsers exact path="/profile/orders/:id"><OrderInfoPage /></RouteForAuthorizedUsers>
          <RouteForAuthorizedUsers path="/profile"><ProfilePage /></RouteForAuthorizedUsers>
          <RouteForUnauthorizedUsers exact path="/login"><LoginPage /></RouteForUnauthorizedUsers>
          <RouteForUnauthorizedUsers exact path="/register"><RegisterPage /></RouteForUnauthorizedUsers>
          <RouteForUnauthorizedUsers exact path="/forgot-password"><ForgotPasswordPage /></RouteForUnauthorizedUsers>
          <RouteForUnauthorizedUsers exact path="/reset-password"><ResetPasswordPage /></RouteForUnauthorizedUsers>
          <Route path="/notfound"><NotFoundPage /></Route>

        </Switch>

      </main>
    </>

  );
}

export default App;
