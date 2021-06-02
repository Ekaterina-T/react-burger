import React from 'react';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';

import PropTypes from 'prop-types';
import {ingredientDescriptor_full} from '../../utils/prop-type-custom-checks';

const Cart = (props) => {

    const [bun, setBun] = React.useState(null);
    const [fillings, setFillings] = React.useState([]);
    const rowData = props.rowData; 

    const addIngredient = (ingredient) => {
        
        const getNewIngredientIndex = (ingredients) => {

            const maxAvailableIndex = ingredients.reduce( (res, item) => { 
                const currentKey = Number(item.key.split('_')[1]);
                return res < currentKey ? currentKey : res;
            },
            -1);  
            
            return maxAvailableIndex+1;
        }

        const setKeyToNewIngredient = (prevIngredients, newIngredient) => {

            const maxAvailableIndex = getNewIngredientIndex(prevIngredients);
            newIngredient.key = newIngredient._id + '_' + maxAvailableIndex;
            
            return;
        }

        if(ingredient.type === "bun") {
            setBun(ingredient); //user can replace bun, but not remove it
            setFillings(fillings);
        } else {
            setBun(bun);
            setFillings( prevState => {
                setKeyToNewIngredient(prevState, ingredient);
                return [...prevState, {...ingredient}]
            });
        }       
    }

    const removeIngredient = (ingredientKey) => {
        return () => {
            setBun(bun);  //user can replace bun, but not remove it
            setFillings( prevState => {
                const removedIngredientIndex = prevState.findIndex(
                    (item) => item.key === ingredientKey
                );

                const updatedCart = [...prevState];
                updatedCart.splice(removedIngredientIndex, 1);
    
                return updatedCart;
            });
        }
    }

    return (
        <>
            <BurgerIngredients rowData={rowData} addIngredientToCart={addIngredient} bun={bun} fillings={fillings}/>
            <BurgerConstructor removeIngredientFromCart = {removeIngredient} bun={bun} fillings={fillings}/>
        </>
    );
}

export default Cart;

Cart.propTypes = {
    rowData: PropTypes.arrayOf(PropTypes.shape(ingredientDescriptor_full))
}