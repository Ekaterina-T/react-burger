import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import './app.css';

import AppHeader from '../app-header/app-header.jsx';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';

import {getIngredientData} from '../../services/actions';
 
function App() {

  const { ingredients_load, ingredients_load_success, ingredients_load_failed } = useSelector(store => store);
  const dispatch = useDispatch();

  //load ingredients
  React.useEffect(() => {
    dispatch(getIngredientData());
  }, [dispatch]);
 
  return (
    <>
      <AppHeader />
      <main>
        { ingredients_load && <p>Данные загружаются</p> }
        { ingredients_load_failed && <p>Ошибка загрузки данных</p>}
        { ingredients_load_success && 
            <DndProvider backend={HTML5Backend}>
              <BurgerIngredients/>
              <BurgerConstructor/>
            </DndProvider>
        }
      </main>
      <div id="modals"></div>
    </>
  );
}

export default App;
