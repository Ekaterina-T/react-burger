import React, { useState, useEffect } from 'react';
import { useDrop } from 'react-dnd';

import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-constructor.module.css';
import BurgerConstructorTotal from './burger-constructor-total/burger-constructor-total';
import BurgerConstructorItem from './burger-constructor-item/burger-constructor-item';
import Placeholder from '../placeholder/placeholder';

import { addIngredientToCart } from '../../services/cart/actions';

import { useAppSelector, useAppDispatch } from '../../services/types';

interface IDropItem {
  id: string;
  type: string;
}

function BurgerConstructor() {
  const dispatch = useAppDispatch();
  const { bun, fillings } = useAppSelector((store) => store.cart);
  const [cartHasItems, setCartHasItems] = useState<boolean>(false);
  const [isBunAdded, setIsBunAdded] = useState<boolean>(false);

  const [{ isOver, isBun }, dropTarget] = useDrop({
    accept: 'ingredient',
    drop(item: IDropItem) {
      if (item.type === 'bun' || !fillings.length) {
        dispatch(addIngredientToCart(item.id));
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      isBun: monitor.getItemType() === 'bun',
    }),
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

  useEffect(() => {
    setCartHasItems(!!bun || fillings.length > 0);
    setIsBunAdded(!!bun);
  }, [bun, fillings.length]);

  return (
    <article className={styles.constructor_area} ref={dropTarget}>
      { cartHasItems
        ? (
          <>
            <div className={styles.main_area}>

              { isBunAdded
              && (
                <ConstructorElement
                  type="top"
                  isLocked
                  text={`${bun!.name} (верх)`}
                  price={bun!.price}
                  thumbnail={bun!.image}
                />
              )}

              <div className={styles.scrollable_area}>
                {fillingsItems.length > 0 && fillingsItems}
                {!fillingsItems.length && isOver && isBunAdded && !isBun && <Placeholder /> }
              </div>

              { isBunAdded
              && (
                <ConstructorElement
                  type="bottom"
                  isLocked
                  text={`${bun!.name} (низ)`}
                  price={bun!.price}
                  thumbnail={bun!.image}
                />
              )}

            </div>
            <BurgerConstructorTotal />
          </>
        )
        : <Placeholder>Добавьте сюда ингредиенты</Placeholder>}
    </article>
  );
}

export default BurgerConstructor;
