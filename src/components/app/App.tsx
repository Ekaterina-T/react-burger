import React from 'react';
import './App.css';

import AppHeader from '../app-header/app-header.jsx';
import Cart from '../cart/cart';

function App() {

  return (
    <>
      <AppHeader />
      <main>
        <Cart />
      </main>
    </>
  );
}

export default App;
