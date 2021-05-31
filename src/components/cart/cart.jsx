import React from 'react';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';

class Cart extends React.Component {

    constructor(props) {
        super(props);
        this.state = {items: []}
    }

    addIngredient = (ingredient) => {

        const assignUniqueKeysTo = (ingredients) => {

            ingredients.map( (item, index) => { 
                item.key = item._id+'_'+index;
                return item;
            });    
            return ingredients;
        }

        const addTwoBunsTo = (prevState) => {
            //buns are added or replaced in pairs
            let ingredients = [...prevState.items].filter( item => item.type !== "bun");
            ingredients.push({...ingredient}); //need ingredient copy to assign unique keys
            ingredients.push({...ingredient});

            return ingredients;
        }

        this.setState(prevState => {

            let updatedItems = []; 

            if(ingredient.type === "bun") {
                updatedItems = addTwoBunsTo(prevState);
            } else {
                updatedItems = [...prevState.items, {...ingredient}];
            }
            
            return { items: assignUniqueKeysTo(updatedItems) };
        });        
    }

    removeIngredient = (ingredientKey) => {
        //callback function for handleClose event
        return () => {
            const removedIngredientIndex = this.state.items.findIndex(
                (item) => item.key === ingredientKey
            );
    
            const updatedCart = [...this.state.items];
            updatedCart.splice(removedIngredientIndex, 1);
            this.setState({items: updatedCart});
        }
    }

    render() {
        return (
            <>
                <BurgerIngredients addIngredientToCart={this.addIngredient} cart={this.state.items}/>
                <BurgerConstructor removeIngredientFromCart = {this.removeIngredient} cart={this.state.items}/>
            </>
        );
    }
}

export default Cart;
