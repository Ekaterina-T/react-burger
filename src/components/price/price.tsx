import React from 'react';

import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './price.module.css';

export type IPrice = {
  price: number | string;
};

function Price({ price }: IPrice) {
  return (
    <div className={styles.price}>
      <span className={styles.price_num}>{price}</span>
      <CurrencyIcon type="primary" />
    </div>
  );
}

export default Price;
