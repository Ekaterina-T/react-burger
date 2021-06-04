import React from 'react';
import './app.css';

import AppHeader from '../app-header/app-header.jsx';
import Cart from '../cart/cart';

import {dataUrl} from '../../utils/constants';
//import {ingredients} from '../../utils/data'

function App() {

  const [dataAreLoading, setDataAreLoading] = React.useState(false); 
  const [data, setData] = React.useState([]);
  const [dataHaveLoaded, setDataHaveLoaded] = React.useState(false);
  const [errorDuringDataLoad, setErrorDuringDataLoad] = React.useState(false);
 
  React.useEffect(() => {

    const getIngredientData = () => {
        
      setDataAreLoading(true);
      setData([]);
      setDataHaveLoaded(false);
      setErrorDuringDataLoad(false);
      
      fetch(dataUrl)
      .then(res => res.ok ? res.json() : Promise.reject(res.statusText))
      .then(res => {
        setDataAreLoading(false);
        setData(res.data);
        setDataHaveLoaded(true);
        setErrorDuringDataLoad(false);
      })
      .catch( e => {
        setDataAreLoading(false);
        setData([]);
        setDataHaveLoaded(false);
        setErrorDuringDataLoad(true);
      });
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
