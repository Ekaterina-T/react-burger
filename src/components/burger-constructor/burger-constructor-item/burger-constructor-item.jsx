import React from 'react';
import styles from './burger-constructor-item.module.css';
import {CurrencyIcon, DragIcon, DeleteIcon, LockIcon }  from '@ya.praktikum/react-developer-burger-ui-components';
//import { render } from '@testing-library/react';
import PropTypes from 'prop-types';
import {isImageLink} from '../../../utils/prop-type-custom-checks';

class BurgerConstructorItem extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        const {image, name, price} = {...this.props.data};
    
        return (
           <li className={styles.constructor_item}>
               <DragIcon />
               <img src={image} alt={name} className={styles.image}/>
               <div className={styles.name}>{name}</div>
               <div className={styles.price}> <span className={styles.price_num}>{price}</span> <CurrencyIcon/> </div> 
               <LockIcon /> 
            </li>
        );

    } 
}

BurgerConstructorItem.propTypes = {
    image: isImageLink,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired     
};

export default BurgerConstructorItem;