import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useDrag } from "react-dnd";

import styles from './ingredient.module.css';
import {Counter, CurrencyIcon, Button}  from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import {isImageLink} from '../../../utils/prop-type-custom-checks';

import {addIngredientToCart} from '../../../services/actions'

const Ingredient = ({ data, openModal}) => {
    
    const dispatch = useDispatch();
    const {cart: {bun, fillings}} = useSelector(store => store);
    const [, dragRef] = useDrag({type: 'ingredient', item: {id: data._id}});

    const ingredientCount = React.useMemo( () => {
            return [...fillings, bun].filter( ingredient => ingredient && data._id === ingredient._id).length;
    }, [fillings, bun, data._id]);

    const addIngredient = (e) => {
        e.stopPropagation();
        dispatch(addIngredientToCart(data._id));
    } 

    const openIngredientDetails = (e) => {
        if(e.target.nodeName !== 'BUTTON') {
            openModal(data);
        }
    }

    const {image, name, price} = data;

    return (
        <li className={styles.card} onClick={openIngredientDetails} ref={dragRef}> 
 
            { ingredientCount>0 && <Counter count={ingredientCount}  size="default"/> }
            <img src={image} alt={name} className={styles.image}/>
            <div className={styles.price}> <span className={styles.price_num}>{price}</span> <CurrencyIcon/> </div>
            <div className={styles.name}>{name}</div>
            <div className={styles.add_btn}><Button type="secondary" size="medium" onClick={addIngredient}>Добавить</Button></div>

        </li>
    );
}

Ingredient.propTypes = {
    data: PropTypes.shape({
        image: isImageLink,
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired
        }
    ).isRequired
};

export default Ingredient;