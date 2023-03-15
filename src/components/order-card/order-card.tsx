/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable no-underscore-dangle */
import React from 'react';

import Price from '../price/price';
import IngredientIconRound from '../ingredient-icon-round/ingredient-icon-round';
import { DateFormatter } from '../../utils/date-formatter/date-formatter';
import formatOrderNumber from '../../utils/order';

import styles from './order-card.module.css';

import { useAppSelector, TOrder, TIngredient } from '../../services/types';

interface IOrderCardProps {
  data: TOrder;
  openModal: (_id: string) => void;
}

function OrderCard({
  data: {
    _id, updatedAt, name, ingredients, number,
  }, openModal,
}: IOrderCardProps) {
  const ingredientsData = useAppSelector((store) => store.ingredients.items);
  const numOfIngredientsInOrder = ingredients.length;
  const MAX_NUM_OF_VISIBLE_ITEMS = 5;

  const drawIngredientImage = (item: TIngredient, index: number) => {
    const SHIFT_OF_IMAGES_PX = 50;

    if (index < MAX_NUM_OF_VISIBLE_ITEMS) {
      return (
        <IngredientIconRound
          key={index}
          image_mobile={item.image_mobile}
          name={item.name}
          customStyle={{
            left: `${index * SHIFT_OF_IMAGES_PX}px`,
            zIndex: (numOfIngredientsInOrder - index),
          }}
        />

      );
    }
    return (
      <span
        key={index}
        className={styles.hiddenIngredientsReplacement}
        style={{
          left: `${(index - 1) * SHIFT_OF_IMAGES_PX}px`,
          zIndex: (numOfIngredientsInOrder - index + 1),
        }}
      >
        {`+${numOfIngredientsInOrder - MAX_NUM_OF_VISIBLE_ITEMS}`}
      </span>
    );
  };

  const images = ingredientsData
    .filter((item) => ingredients.indexOf(item._id) >= 0)
    // = means add extra placeholder for "hidden" ingredients
    .filter((item, index) => index <= MAX_NUM_OF_VISIBLE_ITEMS)
    .map(drawIngredientImage);

  const price = ingredientsData
    .filter((item) => ingredients.indexOf(item._id) >= 0)
    .reduce(
      (sum, ingredient) => sum + ingredient.price,
      0,
    );

  const openOrderInfo = (e: React.MouseEvent) => {
    const elem = e.target as Element;
    if (elem.nodeName !== 'BUTTON') {
      openModal(_id);
    }
  };

  return (
    <article className={styles.card} onClick={openOrderInfo}>
      <p className={styles.topInfo}>
        <span className={styles.id}>{`#${formatOrderNumber(number)}`}</span>
        <span className={styles.timestamp}>{DateFormatter.getRelativeFormat(updatedAt)}</span>
      </p>
      <header className={styles.title}>

        {name}

      </header>
      <div className={styles.bottomInfo}>
        <div className={styles.ingredients}>{images}</div>
        <Price price={price} />
      </div>
    </article>

  );
}

export default OrderCard;
