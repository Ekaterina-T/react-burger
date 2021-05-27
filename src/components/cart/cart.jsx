import React from 'react';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';

class Cart extends React.Component {

    constructor(props) {
        super(props);
        this.state = {items: []}
    }

    addIngredient = (ingredient) => {

        const currentIngredientIndex = this.state.items.findIndex(
            (item) => item._id === ingredient._id
        );

        if(currentIngredientIndex < 0) {

            this.setState(prevState => ({ 
                ...prevState,
                items: [...prevState.items, ingredient]
                })
            );

        } else {
            const updatedCart = [...this.state.items];
            updatedCart[currentIngredientIndex] = ingredient;
            this.setState({items: updatedCart});
        }
    }

    removeIngredient = (ingredientID) => {

        const removedIngredientIndex = this.state.items.findIndex(
            (item) => item._id === ingredientID
        );

        const updatedCart = [...this.state.items];
        updatedCart.splice(removedIngredientIndex, 1);
        this.setState({items: updatedCart});        
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
