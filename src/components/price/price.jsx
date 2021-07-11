import React from 'react';

import {CurrencyIcon}  from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './price.module.css';
import PropTypes from 'prop-types';

const Price = ({price}) => {

    return (
        <div className={styles.price}> <span  className={styles.price_num}>{price}</span> <CurrencyIcon/> </div>
    ); 
}

export default Price;

Price.propTypes = {
    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
}