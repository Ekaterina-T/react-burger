import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import styles from './burger-constructor.module.css';
import {ConstructorElement, DragIcon}  from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerConstructorTotal  from './burger-constructor-total/burger-constructor-total';

import {removeIngredientFromCart} from '../../services/actions'

const BurgerConstructor = () => {

    const dispatch = useDispatch();
    const {cart: {bun, fillings}} = useSelector(store => store);

    const removeIngredient = (ingredientKey) => {
        dispatch(removeIngredientFromCart(ingredientKey));
    }

    const fillingsItems = fillings
                            .map( filling => (
                                <div key = {filling.key} className={styles.burgerIngredient}>
                                    <div className={styles.dragIcon}><DragIcon type="primary" /></div>
                                    <ConstructorElement
                                    isLocked={false}
                                    text={filling.name}
                                    price={filling.price}
                                    thumbnail={filling.image}
                                    handleClose={() => removeIngredient(filling.key)}/>
                                </div>
                            ));

    const cartHasItems = bun || fillings.length > 0;    

    return (        
        <article className={styles.constructor}>
            { cartHasItems 
                ? (<>
                    <div className = {styles.main_area}>

                        { bun != null && 
                        <ConstructorElement type="top" isLocked={true} text={bun.name} price={bun.price} thumbnail={bun.image} /> 
                        }

                        <div className={styles.scrollable_area}> {fillingsItems} </div>

                        { bun != null &&
                        <ConstructorElement type="bottom" isLocked={true} text={bun.name} price={bun.price} thumbnail={bun.image} />
                        }

                    </div>
                    <BurgerConstructorTotal/>
                </>)
                : <p className={styles.emptyConstructor}>Добавьте сюда ингредиенты</p>
            }                            
        </article>        
    ); 
}

export default BurgerConstructor;