import React from 'react';
import './app.css';

import AppHeader from '../app-header/app-header.jsx';
import Cart from '../cart/cart';

function App() {

  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    
    const dataUrl = "https://norma.nomoreparties.space/api/ingredients";

    const getIngredientData = () => {
        
        fetch(dataUrl)
        .then(res => res.json())
        .then(res => {
          setData(res.data);
        })
        .catch( e => {
          setData([]);
          console.error('Error happeed during data load.');
        })
    };

    getIngredientData();

  }, []);


  return (
    <>
      <AppHeader />
      <main>
        <Cart rowData={data}/>
      </main>
      <div id="modals"></div>
    </>
  );
}

export default App;
