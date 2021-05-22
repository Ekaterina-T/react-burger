import React from 'react';
import './App.css';

import AppHeader from '../app-header/app-header.jsx';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';

function App() {
  return (
    <>
      <AppHeader />
      <main>
        <BurgerIngredients />
        <BurgerConstructor />
      </main>
    </>
  );
}

export default App;
