import React from 'react';
import { useDrop } from 'react-dnd';

import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-constructor.module.css';
import BurgerConstructorTotal from './burger-constructor-total/burger-constructor-total';
import BurgerConstructorItem from './burger-constructor-item/burger-constructor-item';

import { addIngredientToCart } from '../../services/cart/actions';

import { useAppSelector, useAppDispatch } from '../../services/types';

interface IDropItem {
  key: string;
  index: string;
  id: string;
  isLocked: boolean;
  text: string;
  price: string;
  thumbnail: string;
}

function BurgerConstructor() {
  const dispatch = useAppDispatch();
  const { bun, fillings } = useAppSelector((store) => store.cart);

  const [, dropTarget] = useDrop({
    accept: 'ingredient',
    drop(item: IDropItem) {
      dispatch(addIngredientToCart(item.id));
    },
  });

  const fillingsItems = fillings.map((filling, index) => (
    <BurgerConstructorItem
      key={filling.key}
      index={index}
      id={filling.key}
      isLocked={false}
      text={filling.name}
      price={filling.price}
      thumbnail={filling.image}
    />
  ));

  const cartHasItems = bun || fillings.length > 0;

  return (
    <article className={styles.constructor_area} ref={dropTarget}>
      { cartHasItems
        ? (
          <>
            <div className={styles.main_area}>

              { bun != null
                            && <ConstructorElement type="top" isLocked text={`${bun.name} (верх)`} price={bun.price} thumbnail={bun.image} />}

              <div className={styles.scrollable_area}>
                {fillingsItems}
              </div>

              { bun != null
                            && <ConstructorElement type="bottom" isLocked text={`${bun.name} (низ)`} price={bun.price} thumbnail={bun.image} />}

            </div>
            <BurgerConstructorTotal />
          </>
        )
        : <p className={styles.emptyConstructor}>Добавьте сюда ингредиенты</p>}
    </article>
  );
}

export default BurgerConstructor;
