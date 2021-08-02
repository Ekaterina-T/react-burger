import React from 'react';
import { useSelector } from 'react-redux';

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import BurgerIngredients from '../components/burger-ingredients/burger-ingredients';
import BurgerConstructor from '../components/burger-constructor/burger-constructor';

import { useAppSelector } from '../services/types';
 
function MainPage() {

  const { ingredientsLoad, ingredientsLoadSuccess, ingredientsLoadFailed } = useAppSelector(store => store.ingredients);
 
  return (
    <>
    { ingredientsLoad && <p>Данные загружаются</p> }
    { ingredientsLoadFailed && <p>Ошибка загрузки данных</p>}
    { ingredientsLoadSuccess && 
        <DndProvider backend={HTML5Backend}>
            <BurgerIngredients/>
            <BurgerConstructor/>
        </DndProvider>
    }
    </>
  );
}

export default MainPage;
