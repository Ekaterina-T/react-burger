import React from 'react';
import './app.css';

import AppHeader from '../app-header/app-header.jsx';
import Cart from '../cart/cart';

function App() {

  const [data, setData] = React.useState([]);
  const [dataAreLoading, setDataAreLoading] = React.useState(false);
  const [dataHaveLoaded, setDataHaveLoaded] = React.useState(false);
  const [errorDuringDataLoad, setErrorDuringDataLoad] = React.useState(false);

  React.useEffect(() => {
    
    const dataUrl = "https://norma.nomoreparties.space/api/ingredients";

    const getIngredientData = () => {
      
        setData([]);
        setDataAreLoading(true);
        setDataHaveLoaded(false);
        setErrorDuringDataLoad(false);
        
        fetch(dataUrl)
        .then(res => res.ok ? res.json() : Promise.reject(res.statusText))
        .then(res => {
          setData(res.data);
          setDataAreLoading(false);
          setDataHaveLoaded(true);
          setErrorDuringDataLoad(false);
        })
        .catch( e => {
          setData([]);
          setDataAreLoading(false);
          setDataHaveLoaded(false);
          setErrorDuringDataLoad(true);
          console.error('Error happeed during data load.');
        })
    };

    getIngredientData();

  }, []);

  return (
    <>
      <AppHeader />
      <main>
        { dataAreLoading && <p>Данные загружаются</p> }
        { errorDuringDataLoad && <p>Ошибка загрузки данных</p>}
        { dataHaveLoaded && <Cart rowData={data}/> }
      </main>
      <div id="modals"></div>
    </>
  );
}

export default App;
