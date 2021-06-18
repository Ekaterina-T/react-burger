import React from 'react';
import styles from './burger-constructor-item.module.css';
import { useDispatch } from 'react-redux';
import { useDrag, useDrop } from "react-dnd";

import {ConstructorElement, DragIcon}  from '@ya.praktikum/react-developer-burger-ui-components';

import {removeIngredientFromCart, sortFillingsOrder} from '../../../services/cart/actions'

import PropTypes from 'prop-types';
import {isImageLink} from '../../../utils/prop-type-custom-checks'

const BurgerConstructorItem = ({index, id, text, price, thumbnail, isLocked}) => {
    
    const dispatch = useDispatch();
    
    const [collectedDrag, dragRef] = useDrag({
        type: "fillings", 
        item: {id, index},
        collect: monitor => ({
            isDragging: monitor.isDragging()
        })
    });

    const [, fillingsRef] = useDrop({
        accept:'fillings',
        drop(item) {
            const draggedIndex = item.index;
            const hoverIndex = index;

            if(draggedIndex !== hoverIndex) {
                dispatch(sortFillingsOrder(draggedIndex, hoverIndex));
            }            
        }
    });

    const removeIngredient = (ingredientKey) => {
        dispatch(removeIngredientFromCart(ingredientKey));
    }

    return (
        <div ref={fillingsRef}>
            {!collectedDrag.isDragging ?   
                <div id={id} className={styles.burgerIngredient} ref={dragRef}  >
                    <div className={styles.dragIcon}><DragIcon type="primary" /></div>
                    <ConstructorElement
                    isLocked={isLocked}
                    text={text}
                    price={price}
                    thumbnail={thumbnail}
                    handleClose={() => removeIngredient(id)}/>
                </div>
                : <div className={styles.dragPreview} ></div>
            }
        </div>
    )

}

export default BurgerConstructorItem

BurgerConstructorItem.propTypes = {
    index: PropTypes.number.isRequired,
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired, 
    thumbnail: isImageLink, 
    isLocked: PropTypes.bool.isRequired
};