import React from 'react';
import styles from './burger-constructor.module.css';
//import { render } from '@testing-library/react';
import {ConstructorElement}  from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerConstructorTotal  from './burger-constructor-total/burger-constructor-total';
import PropTypes from 'prop-types';

class BurgerConstructor extends React.Component {

    render() {

        const ingredients = this.props.cart;
        
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
                                handleClose={this.props.removeIngredientFromCart(bun.key)}/>
                    ));

        const fillings = ingredients
                        .filter((ingredient) => (ingredient.type !== "bun"))
                        .map((filling, index) => (
                            <ConstructorElement 
                                key = {filling.key}
                                isLocked={false} 
                                text={filling.name} 
                                price={filling.price} 
                                thumbnail={filling.image} 
                                handleClose={this.props.removeIngredientFromCart(filling.key)}/>
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
}

BurgerConstructor.propTypes = {
    cart: PropTypes.arrayOf(PropTypes.object)
};

export default BurgerConstructor;