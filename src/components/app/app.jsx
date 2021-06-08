import React from 'react';
import './app.css';

import AppHeader from '../app-header/app-header.jsx';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';

import {dataUrl} from '../../utils/constants';
import {IngredientsContext} from '../../services/ingredients-context';
 
function App() {

  const [dataLoadStatus, setDataLoadStatus] = React.useState({isLoading: false, haveLoaded: false, errorDuringDataLoad: false});
  const [ingredients, setIngredients] = React.useState([]);
  const [cart, setCart] = React.useState({bun: null, fillings: []});

  //load ingredients
  React.useEffect(() => {

    const getIngredientData = () => {
        
      setDataLoadStatus({isLoading: true, haveLoaded: false, errorDuringDataLoad: false});
      setIngredients([]);
      setCart({bun: null, fillings: []});
      
      fetch(dataUrl)
      .then(res => res.ok ? res.json() : Promise.reject(res.statusText))
      .then(res => {
        setDataLoadStatus({isLoading: false, haveLoaded: true, errorDuringDataLoad: false});
        setIngredients(res.data);
        setCart({bun: null, fillings: []});
      })
      .catch( e => {
        setDataLoadStatus({isLoading: false, haveLoaded: false, errorDuringDataLoad: true});  
        setIngredients([]);
        setCart({bun: null, fillings: []});      
      });
    };

    getIngredientData();

  }, []);

  const addIngredientToCart = (ingredient) => {
      
      const getNewIngredientIndex = (ingredients) => {

          const maxAvailableIndex = ingredients.reduce( (res, item) => { 
              const currentKey = Number(item.key.split('_')[1]);
              return res < currentKey ? currentKey : res;
          },
          -1);  
          
          return maxAvailableIndex+1;
      }

      const setKeyToNewIngredient = (newIngredient, key) => {
          newIngredient.key = key;            
          return;
      }

      if(ingredient.type === "bun") {
        setCart( prevState => ( {...prevState, bun: ingredient} )); //user can replace bun, but not remove it
      } else {
        setCart( prevState => {
          setKeyToNewIngredient(ingredient, [ingredient._id, getNewIngredientIndex(prevState.fillings)].join('_'));
          return {
            ...prevState,
            fillings: [...prevState.fillings, {...ingredient}]
          }
        });
      }       
  }

  const removeIngredientFromCart = (ingredientKey) => {
      return () => {
        
        setCart( prevState => {

          const removedIngredientIndex = prevState.fillings.findIndex((item) => item.key === ingredientKey);
          const updatedCart = [...prevState.fillings];
          updatedCart.splice(removedIngredientIndex, 1);
          
          return {
            ...prevState,
            fillings: updatedCart
          }

        });

      }
  }
 
  return (
    <>
      <AppHeader />
      <main>
        { dataLoadStatus.isLoading && <p>Данные загружаются</p> }
        { dataLoadStatus.errorDuringDataLoad && <p>Ошибка загрузки данных</p>}
        { dataLoadStatus.haveLoaded && 
            <IngredientsContext.Provider value={{ingredients, cart, addIngredientToCart, removeIngredientFromCart}}>
                <BurgerIngredients/>
                <BurgerConstructor/>
            </IngredientsContext.Provider>
        }
      </main>
      <div id="modals"></div>
    </>
  );
}

export default App;
