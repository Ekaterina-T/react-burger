import React from 'react';
import styles from './burger-constructor.module.css';
//import { render } from '@testing-library/react';
import {ConstructorElement}  from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerConstructorTotal  from './burger-constructor-total/burger-constructor-total';
import PropTypes from 'prop-types';

class BurgerConstructor extends React.Component {

    removeIngredient = () => {
        this.props.removeFromCart(this.props.key);
    }

    render() {

        const ingredients = this.props.cart;
        const cartIsEmpty = ingredients.length === 0;
        const showCart = !cartIsEmpty;
        const lastItemIndex = ingredients.length - 1; 
        const total = cartIsEmpty ? 0: ingredients.reduce((acc, ingredient) => acc + ingredient.price * ingredient.count, 0); 

        return (
           
            <article className={styles.constructor}>

                { showCart && 
                    <>
                        <div className = {styles.main_area}>

                            <ConstructorElement 
                                key = {ingredients[0]._id}
                                type="top"
                                isLocked={false} 
                                text={ingredients[0].name} 
                                price={ingredients[0].price} 
                                thumbnail={ingredients[0].image} 
                                handleClose={this.props.removeIngredientFromCart}/>

                            <div className={styles.scrollable_area}>
                                { ingredients
                                .filter((ingredient, index) => (index>0 && index < ingredients.length-1))
                                .map((ingredient) => (
                                    <ConstructorElement 
                                        key = {ingredient._id}
                                        isLocked={false} 
                                        text={ingredient.name} 
                                        price={ingredient.price} 
                                        thumbnail={ingredient.image} 
                                        handleClose={this.props.removeIngredientFromCart}/>
                                    ))
                                }
                            </div>

                            {
                                lastItemIndex > 0 && 
                                <ConstructorElement 
                                    key = {ingredients[lastItemIndex]._id}
                                    type="bottom"
                                    isLocked={false} 
                                    text={ingredients[lastItemIndex].name} 
                                    price={ingredients[lastItemIndex].price} 
                                    thumbnail={ingredients[lastItemIndex].image} 
                                    handleClose={this.props.removeIngredientFromCart}/>
                            }

                        </div>
                        <BurgerConstructorTotal total={total}/>
                    </>
                }
                                
            </article>
            
        ); 
    }
}

BurgerConstructor.propTypes = {
    cart: PropTypes.arrayOf(PropTypes.object)
};

export default BurgerConstructor;