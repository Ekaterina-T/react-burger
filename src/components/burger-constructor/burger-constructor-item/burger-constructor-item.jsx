import React from 'react';
import styles from './burger-constructor-item.module.css';
import { useDispatch } from 'react-redux';
import { useDrag, useDrop } from "react-dnd";

import {ConstructorElement, DragIcon}  from '@ya.praktikum/react-developer-burger-ui-components';

import {removeIngredientFromCart, sortFillingsOrder} from '../../../services/actions'

import PropTypes from 'prop-types';
import {isImageLink} from '../../../utils/prop-type-custom-checks'

const BurgerConstructorItem = ({index, id, text, price, thumbnail, isLocked}) => {
    
    const dispatch = useDispatch();
    
    const [{isDragged}, dragRef] = useDrag({
        type: "fillings", 
        item: {id, index},
        collect: monitor => ({
            isDragged: monitor.isDragging()
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
            {!isDragged && 
                <div id={id} className={styles.burgerIngredient} ref={dragRef}>
                    <div className={styles.dragIcon}><DragIcon type="primary" /></div>
                    <ConstructorElement
                    isLocked={isLocked}
                    text={text}
                    price={price}
                    thumbnail={thumbnail}
                    handleClose={() => removeIngredient(id)}/>
                </div>
            }
        </div>
    )

}

export default BurgerConstructorItem

BurgerConstructorItem.propTypes = {
    index: PropTypes.number,
    id: PropTypes.string,
    text: PropTypes.string,
    price: PropTypes.number, 
    thumbnail: isImageLink, 
    isLocked: PropTypes.bool
};