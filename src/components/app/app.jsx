import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Route, Switch, useLocation, useHistory } from 'react-router-dom';

import './app.css';

import AppHeader from '../app-header/app-header.jsx';
import RouteForAuthorizedUsers from '../route-auth-users/route-auth-users';
import RouteForUnauthorizedUsers from '../route-unauth-users/route-unauth-users';
import { MainPage, LoginPage, RegisterPage, ForgotPasswordPage, ResetPasswordPage, ProfilePage, FeedPage, NotFoundPage, OrderInfoPage } from '../../pages';
import IngredientDetails from '../ingredient-details/ingredient-details';

import { getIngredientData } from '../../services/ingredients/actions';
import { recognizeUser } from '../../services/user/actions';

function App() {

  const dispatch = useDispatch();  
  const { ingredientsLoadSuccess } = useSelector(store => store.ingredients);

  const location = useLocation();
  const history = useHistory();
  const background = history.action === 'PUSH' && location.state && location.state.background;

  React.useEffect( () => {
    dispatch(getIngredientData());
    dispatch(recognizeUser());
  },[dispatch]); 

  if(!ingredientsLoadSuccess) {
    return <p> Данные загружаются </p>;
  }

  /*
  if(background) {
    console.log(true)
    console.log('bg pathname: '+background.pathname);
    console.log('loc pathname: '+location.pathname);
  } else {
    console.log(false)
  } */
 
  return (

    <>
      <AppHeader />
      <main>
        <Switch location={background || location}>

          <Route exact path='/'> <MainPage /> </Route>
          <Route exact path='/ingredients/:id' > <IngredientDetails /> </Route>  

          <RouteForAuthorizedUsers   exact path='/feed' > <FeedPage /> </RouteForAuthorizedUsers> 
          <RouteForAuthorizedUsers   exact path='/profile' > <ProfilePage /> </RouteForAuthorizedUsers> 
          <RouteForAuthorizedUsers   exact path={['/feed/:id', 'profile/orders/:id' ]} > <OrderInfoPage /> </RouteForAuthorizedUsers> 

          <RouteForUnauthorizedUsers exact path='/login' > <LoginPage /> </RouteForUnauthorizedUsers> 
          <RouteForUnauthorizedUsers exact path='/register' > <RegisterPage /> </RouteForUnauthorizedUsers> 
          <RouteForUnauthorizedUsers exact path='/forgot-password' > <ForgotPasswordPage /> </RouteForUnauthorizedUsers> 
          <RouteForUnauthorizedUsers exact path='/reset-password' > <ResetPasswordPage /> </RouteForUnauthorizedUsers> 
    
          <Route path='/notfound'> <NotFoundPage /> </Route>

        </Switch>

      </main>
    </>

  );
}

export default App;
