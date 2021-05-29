import React from 'react';
import styles from './burger-constructor.module.css';
//import { render } from '@testing-library/react';
import {ConstructorElement}  from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerConstructorTotal  from './burger-constructor-total/burger-constructor-total';
import PropTypes from 'prop-types';

const BurgerConstructor = (props) => {

    const ingredients = props.cart;
    const removeIngredientFromCart = props.removeIngredientFromCart;
    
    const showCart = ingredients.length > 0;
    const total = showCart ? ingredients.reduce((acc, ingredient) => acc + ingredient.price, 0) : 0; 

    const buns = ingredients
                .filter((ingredient) => (ingredient.type === "bun"))
                .map((bun, index) => (
                    <ConstructorElement 
                            key = {bun.key}
                            type={index === 0 ? "top" : "bottom"}
                            isLocked={true} 
                            text={bun.name} 
                            price={bun.price} 
                            thumbnail={bun.image} 
                            handleClose={removeIngredientFromCart(bun.key)}/>
                ));

    const fillings = ingredients
                    .filter((ingredient) => (ingredient.type !== "bun"))
                    .map( filling => (
                        <ConstructorElement 
                            key = {filling.key}
                            isLocked={false} 
                            text={filling.name} 
                            price={filling.price} 
                            thumbnail={filling.image} 
                            handleClose={removeIngredientFromCart(filling.key)}/>
                        ));
    

    return (        
        <article className={styles.constructor}>
            { showCart && 
                <>
                    <div className = {styles.main_area}>

                        { buns.length > 0 && buns[0] }
                        <div className={styles.scrollable_area}> {fillings} </div>
                        { buns.length > 0 && buns[1] }

                    </div>
                    <BurgerConstructorTotal total={total}/>
                </>
            }                            
        </article>        
    ); 
}

BurgerConstructor.propTypes = {
    cart: PropTypes.arrayOf(PropTypes.object)
};

export default BurgerConstructor;