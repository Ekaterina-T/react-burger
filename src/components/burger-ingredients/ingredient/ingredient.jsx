import React from 'react';
import styles from './ingredient.module.css';
import {Counter, CurrencyIcon, Button}  from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import {isImageLink} from '../../../utils/prop-type-custom-checks';

const Ingredient = (props) => {
    
    const addIngredient = (e) => {
        e.stopPropagation();
        updateCart(props.data);
    } 

    const showIngredientDetails = (e) => {
        if(e.target.nodeName !== 'BUTTON') {
            openModal(props.data);
        }
    }

    const {image, name, price, count} = props.data;
    const { updateCart, openModal} = props;

    return (
        <li className={styles.card} onClick={showIngredientDetails}>
 
            { count>0 && <Counter count={count}  size="default"/> }
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
        price: PropTypes.number.isRequired,
        count: PropTypes.number.isRequired
        }
    ).isRequired,
    updateCart: PropTypes.func.isRequired    
};

export default Ingredient;