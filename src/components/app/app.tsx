import React from 'react';
import './app.css';

import AppHeader from '../app-header/app-header.jsx';
import Cart from '../cart/cart';

function App() {

  return (
    <>
      <AppHeader />
      <main>
        <Cart />
      </main>
      <div id="modals"></div>
    </>
  );
}

export default App;
