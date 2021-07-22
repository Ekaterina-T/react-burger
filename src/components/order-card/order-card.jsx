import React from 'react';
import { useSelector } from 'react-redux';

import Price from '../price/price';
import IngredientIconRound from '../ingredient-icon-round/ingredient-icon-round';
import { DateFormatter } from '../../utils/date-formatter/date-formatter';
import { formatOrderNumber } from '../utils/order';

import PropTypes from 'prop-types';

import styles from './order-card.module.css';

const OrderCard = ({data: {_id, updatedAt, name, ingredients, number}, openModal }) => {

    const ingredientsData = useSelector(store => store.ingredients.items);
    const numOfIngredientsInOrder = ingredients.length;
    const MAX_NUM_OF_VISIBLE_ITEMS = 5;

    const drawIngredientImage = (item, index) => {

        const SHIFT_OF_IMAGES_PX = 50;

        if(index < MAX_NUM_OF_VISIBLE_ITEMS) { 
            return (
                <IngredientIconRound 
                key = {index} 
                image_mobile = {item.image_mobile}
                name = {item.name}
                customStyle={{
                    left: `${index*SHIFT_OF_IMAGES_PX}px`,
                    zIndex: (numOfIngredientsInOrder - index)
                }}/>
                
                
            );
        } else {
            return (
                <span key = {index} className = {styles.hiddenIngredientsReplacement}
                    style = {{
                        left: `${(index-1)*SHIFT_OF_IMAGES_PX}px`,
                        zIndex: (numOfIngredientsInOrder - index+1)
                    }}
                >
                    {`+${numOfIngredientsInOrder - MAX_NUM_OF_VISIBLE_ITEMS}`}
                </span>
            )
        }      
    }

    const images = ingredientsData
                    .filter( item => ingredients.indexOf(item._id) >= 0) 
                    .filter( (item, index) => index <= MAX_NUM_OF_VISIBLE_ITEMS ) // = means add extra placeholder for "hidden" ingredients
                    .map(drawIngredientImage);

    const price = ingredientsData
                    .filter( item => ingredients.indexOf(item._id) >= 0)
                    .reduce( (sum, ingredient) => (sum += ingredient.price), 0);


    const openOrderInfo = (e) => {
        if(e.target.nodeName !== 'BUTTON') {
            openModal(_id);
        }
    }

    return (
        
        <article className={styles.card} onClick={openOrderInfo}>              
            <p className={styles.topInfo}>
                <span className={styles.id}>{`#${formatOrderNumber(number)}`}</span>
                <span className={styles.timestamp}>{DateFormatter.getRelativeFormat(updatedAt)}</span>
            </p>           
            <header className={styles.title}> {name} </header> 
            <div className={styles.bottomInfo}>
                <div className={styles.ingredients}>{images}</div>
                <Price price={price}/>
            </div>          
        </article>
  
    ); 
}

export default OrderCard;

OrderCard.propTypes = {
    data: PropTypes.shape(
        {
            _id: PropTypes.string.isRequired,
            createdAt: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            ingredients: PropTypes.arrayOf(PropTypes.string).isRequired
        } 
    ).isRequired,
    openModal: PropTypes.func.isRequired
}