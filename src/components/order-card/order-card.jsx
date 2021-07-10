import React from 'react';
import { useRouteMatch, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Price from '../price/price';
import IngredientIconRound from '../ingredient-icon-round/ingredient-icon-round';

import styles from './order-card.module.css';

const OrderCard = ({data: {id, timestamp, title, ingredientIDs, price} }) => {

    const {url} = useRouteMatch();

    const ingredients = useSelector(store => store.ingredients.items);
    const numOfIngredientsInOrder = ingredientIDs.length;
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

    const images = ingredients
                    .filter( item => ingredientIDs.indexOf(item._id) >= 0) 
                    .filter( (item, index) => index <= MAX_NUM_OF_VISIBLE_ITEMS ) // = means add extra placeholder for "hidden" ingredients
                    .map(drawIngredientImage);
        

    return (
        <Link to={{ pathname: `${url}/${id}` }} className={styles.link} >
            <article className={styles.card} >              
                <p className={styles.topInfo}>
                    <span className={styles.id}>{`#${id}`}</span>
                    <span className={styles.timestamp}>{timestamp}</span>
                </p>           
                <header className={styles.title}> {title} </header> 
                <div className={styles.bottomInfo}>
                    <div className={styles.ingredients}>{images}</div>
                    <Price price={price}/>
                </div>          
            </article>
        </Link>
        
    ); 
}

export default OrderCard;