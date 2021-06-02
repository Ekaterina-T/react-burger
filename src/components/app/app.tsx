import React from 'react';
import './app.css';

import AppHeader from '../app-header/app-header.jsx';
import Cart from '../cart/cart';

import {dataUrl} from '../../utils/constants';

function App() {

  const [data, setData] = React.useState([]);
  const [dataHaveLoaded, setDataHaveLoaded] = React.useState(false);
  const [errorDuringDataLoad, setErrorDuringDataLoad] = React.useState(false);
  const [dataAreLoading, setDataAreLoading] = React.useState(false); //on last place to save order of states inside fetch

  React.useEffect(() => {
    
    const getIngredientData = () => {
      
        setData([]);
        setDataAreLoading(true);
        setDataHaveLoaded(false);
        setErrorDuringDataLoad(false);
        
        fetch(dataUrl)
        .then(res => res.ok ? res.json() : Promise.reject(res.statusText))
        .then(res => {
          setData(res.data);
          setDataHaveLoaded(true);
          setErrorDuringDataLoad(false);
        })
        .catch( e => {
          setData([]);
          setDataHaveLoaded(false);
          setErrorDuringDataLoad(true);
          console.error('Error happeed during data load.');
        }).finally(()=>{
          setDataAreLoading(false);
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
