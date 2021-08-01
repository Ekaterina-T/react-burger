import React, {FC} from 'react';
import { useDrag } from "react-dnd";

import styles from './ingredient.module.css';
import {Counter, CurrencyIcon, Button}  from '@ya.praktikum/react-developer-burger-ui-components';

import {addIngredientToCart} from '../../../services/cart/actions';

import { useAppSelector, useAppDispatch } from '../../../services/types';
import { TIngredient } from '../../../services/types/index';

interface IIngredient {
    data: TIngredient;
    openModal: any;
}

const Ingredient: FC<IIngredient> = ({ data, openModal}) => {
    
    const dispatch = useAppDispatch();
    const {bun, fillings} = useAppSelector(store => store.cart);
    const [, dragRef] = useDrag({type: 'ingredient', item: {id: data._id}});

    const ingredientCount = React.useMemo( () => {
            let count = [...fillings, bun].filter( ingredient => ingredient && data._id === ingredient._id).length;
            if(data.type === 'bun' && count>0) {
                count++;
            }
            return count;
    }, [fillings, bun, data._id, data.type]);

    const addIngredient = (e) => {
        e.stopPropagation();
        dispatch(addIngredientToCart(data._id));
    } 

    const openIngredientDetails = (e) => {
        if((e.target as Element).nodeName !== 'BUTTON') {
            openModal(data);
        }
    }

    const {image, name, price} = data;

    return (
        <li className={styles.card} onClick={openIngredientDetails} ref={dragRef}> 
 
            { ingredientCount>0 && <Counter count={ingredientCount}  size="default"/> }
            <img src={image} alt={name} className={styles.image}/>
            <div className={styles.price}> <span className={styles.price_num}>{price}</span> <CurrencyIcon type="secondary" /> </div>
            <div className={styles.name}>{name}</div>
            <div className={styles.add_btn}><Button type="secondary" size="medium" onClick={addIngredient}>Добавить</Button></div>

        </li>
    );
}

export default Ingredient;