import React from 'react';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';

const Cart = (props) => {

    const [items, setItems] = React.useState([]);
    const rowData = props.rowData; 

    const addIngredient = (ingredient) => {

        const assignUniqueKeysTo = (ingredients) => {

            ingredients.map( (item, index) => { 
                item.key = item._id+'_'+index;
                return item;
            });    
            return ingredients;
        }

        const addTwoBunsTo = (items) => {
            //buns are added or replaced in pairs
            let ingredients = items.filter( item => item.type !== "bun");
            ingredients.push({...ingredient}); //need ingredient copy to assign unique keys
            ingredients.push({...ingredient});

            return ingredients;
        }

        setItems(prevState => {
            
            let updatedItems = []; 

            if(ingredient.type === "bun") {
                updatedItems = addTwoBunsTo([...prevState]);
            } else {
                updatedItems = [...prevState, {...ingredient}];
            }
            
            return assignUniqueKeysTo(updatedItems);
        });        
    }

    const removeIngredient = (ingredientKey) => {
        //callback function for handleClose event
        return () => {
            const removedIngredientIndex = items.findIndex(
                (item) => item.key === ingredientKey
            );
    
            const updatedCart = [...items];
            updatedCart.splice(removedIngredientIndex, 1);
            setItems(updatedCart);
        }
    }

    return (
        <>
            <BurgerIngredients rowData={rowData} addIngredientToCart={addIngredient} cart={items}/>
            <BurgerConstructor removeIngredientFromCart = {removeIngredient} cart={items}/>
        </>
    );
}

export default Cart;
