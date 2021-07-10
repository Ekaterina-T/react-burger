import React from 'react';

import {CurrencyIcon}  from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './price.module.css';

const Price = ({price}) => {

    return (
        <div className={styles.price}> <span  className={styles.price_num}>{price}</span> <CurrencyIcon/> </div>
    ); 
}

export default Price;