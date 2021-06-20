import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import './app.css';

import AppHeader from '../app-header/app-header.jsx';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';

import {getIngredientData} from '../../services/ingredients/actions';
 
function App() {

  const { ingredientsLoad, ingredientsLoadSuccess, ingredientsLoadFailed } = useSelector(store => store.ingredients);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getIngredientData());
  }, [dispatch]);
 
  return (
    <>
      <AppHeader />
      <main>
        { ingredientsLoad && <p>Данные загружаются</p> }
        { ingredientsLoadFailed && <p>Ошибка загрузки данных</p>}
        { ingredientsLoadSuccess && 
            <DndProvider backend={HTML5Backend}>
              <BurgerIngredients/>
              <BurgerConstructor/>
            </DndProvider>
        }
      </main>
    </>
  );
}

export default App;
