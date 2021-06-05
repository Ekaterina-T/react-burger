import React from 'react';
import './app.css';

import AppHeader from '../app-header/app-header.jsx';
import Cart from '../cart/cart';

import {dataUrl} from '../../utils/constants';
//import {ingredients} from '../../utils/data'

function App() {

  const [data, setData] = React.useState([]);
  const [dataLoadStatus, setDataLoadStatus] = React.useState({isLoading: false, haveLoaded: false, errorDuringDataLoad: false});
 
  React.useEffect(() => {

    const getIngredientData = () => {
        
      setData([]);
      setDataLoadStatus({isLoading: true, haveLoaded: false, errorDuringDataLoad: false});
      
      fetch(dataUrl)
      .then(res => res.ok ? res.json() : Promise.reject(res.statusText))
      .then(res => {
        setData(res.data);
        setDataLoadStatus({isLoading: false, haveLoaded: true, errorDuringDataLoad: false});
      })
      .catch( e => {
        setData([]);
        setDataLoadStatus({isLoading: false, haveLoaded: false, errorDuringDataLoad: true});        
      });
    };

    getIngredientData();

  }, []);

  return (
    <>
      <AppHeader />
      <main>
        { dataLoadStatus.isLoading && <p>Данные загружаются</p> }
        { dataLoadStatus.errorDuringDataLoad && <p>Ошибка загрузки данных</p>}
        { dataLoadStatus.haveLoaded && <Cart rowData={data}/> }
      </main>
      <div id="modals"></div>
    </>
  );
}

export default App;
