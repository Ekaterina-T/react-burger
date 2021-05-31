import React from 'react';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';

const Cart = (props) => {

    const [bun, setBun] = React.useState(null);
    const [fillings, setFillings] = React.useState([]);
    const rowData = props.rowData; 

    const addIngredient = (ingredient) => {

        const assignUniqueKeysTo = (ingredients) => {

            ingredients.map( (item, index) => { 
                item.key = item._id+'_'+item.type+'_'+index;
                return item;
            });  
            
            return ingredients;
        }

        if(ingredient.type === "bun") {
            setBun(ingredient); //user can replace bun, but not remove it
            setFillings(fillings);
        } else {
            setBun(bun);
            setFillings( prevState => assignUniqueKeysTo([...prevState, {...ingredient}]) );
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
