import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import './app.css';

import AppHeader from '../app-header/app-header.jsx';
import { MainPage, LoginPage, RegisterPage, ForgotPasswordPage, ResetPasswordPage, ProfilePage } from '../../pages';

 
function App() {
 
  return (

    <BrowserRouter>
      <AppHeader />
      <main>
        <Switch>
          <Route path='/login'> <LoginPage /> </Route> 
          <Route path='/register'> <RegisterPage /> </Route> 
          <Route path='/forgot-password'> <ForgotPasswordPage /> </Route> 
          <Route path='/reset-password'> <ResetPasswordPage /> </Route> 
          <Route path='/profile'> <ProfilePage /> </Route> 
          <Route path='/'> <MainPage /> </Route>            
        </Switch>
      </main>
    </BrowserRouter>

  );
}

export default App;
