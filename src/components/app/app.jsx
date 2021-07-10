import React from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import './app.css';

import AppHeader from '../app-header/app-header.jsx';
import RouteForAuthorizedUsers from '../route-auth-users/route-auth-users';
import RouteForUnauthorizedUsers from '../route-unauth-users/route-unauth-users';
import { MainPage, LoginPage, RegisterPage, ForgotPasswordPage, ResetPasswordPage, ProfilePage, FeedPage, NotFoundPage, OrderInfoPage } from '../../pages';

import { getIngredientData } from '../../services/ingredients/actions';
import { recognizeUser } from '../../services/user/actions';

function App() {

  const dispatch = useDispatch();

  React.useEffect( () => {
    dispatch(getIngredientData());
    dispatch(recognizeUser());
  },[dispatch]);
 
  return (

    <BrowserRouter>
      <AppHeader />
      <main>
        <Switch>
          <RouteForUnauthorizedUsers path='/login' exact> <LoginPage /> </RouteForUnauthorizedUsers> 
          <RouteForUnauthorizedUsers path='/register' exact> <RegisterPage /> </RouteForUnauthorizedUsers> 
          <RouteForUnauthorizedUsers path='/forgot-password' exact> <ForgotPasswordPage /> </RouteForUnauthorizedUsers> 
          <RouteForUnauthorizedUsers path='/reset-password' exact> <ResetPasswordPage /> </RouteForUnauthorizedUsers> 
          <RouteForAuthorizedUsers   path='/feed' exact> <FeedPage /> </RouteForAuthorizedUsers> 
          <RouteForAuthorizedUsers   path={['/feed/:id', 'profile/orders/:id' ]} exact> <OrderInfoPage /> </RouteForAuthorizedUsers> 
          <RouteForAuthorizedUsers   path='/profile' > <ProfilePage /> </RouteForAuthorizedUsers> 
          <Route path='/' exact> <MainPage /> </Route>         
          <Route path='/notfound'> <NotFoundPage /> </Route>
        </Switch>
      </main>
    </BrowserRouter>

  );
}

export default App;
