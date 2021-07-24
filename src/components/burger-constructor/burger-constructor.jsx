import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useDrop } from "react-dnd";

import styles from './burger-constructor.module.css';
import {ConstructorElement}  from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerConstructorTotal  from './burger-constructor-total/burger-constructor-total';
import BurgerConstructorItem from './burger-constructor-item/burger-constructor-item';

import {addIngredientToCart} from '../../services/cart/actions'

const BurgerConstructor = () => {

    const dispatch = useDispatch();
    const {bun, fillings} = useSelector(store => store.cart);

    const [, dropTarget] = useDrop({
        accept:'ingredient',
        drop(item) {
            dispatch(addIngredientToCart(item.id));
        } 
    });

    const fillingsItems = fillings.map( (filling, index) => (
        <BurgerConstructorItem
        key = {filling.key} 
        index = {index}
        id = {filling.key}
        isLocked={false} 
        text={filling.name} 
        price={filling.price} 
        thumbnail={filling.image} />                                
    ));

    const cartHasItems = bun || fillings.length > 0;    

    return (
        <article className={styles.constructor} ref={dropTarget} >
            { cartHasItems 
                ? (<>
                        <div className = {styles.main_area}>

                            { bun != null && 
                            <ConstructorElement type="top" isLocked={true} text={bun.name+" (верх)"} price={bun.price} thumbnail={bun.image} /> 
                            }

                            <div className={styles.scrollable_area}> 
                                {fillingsItems}  
                            </div>

                            { bun != null &&
                            <ConstructorElement type="bottom" isLocked={true} text={bun.name+" (низ)"} price={bun.price} thumbnail={bun.image} />
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