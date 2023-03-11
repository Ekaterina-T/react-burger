import React, { ReactElement } from 'react';
import { useDrag, useDrop } from 'react-dnd';

import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-constructor-item.module.css';

import { removeIngredientFromCart, sortFillingsOrder } from '../../../services/cart/actions';
import { useAppDispatch } from '../../../services/types';

interface IBurgerConstructorItem {
  index: number;
  id: string;
  text: string;
  price: number;
  thumbnail: string;
  isLocked: boolean;
}

function BurgerConstructorItem({
  index, id, text, price, thumbnail, isLocked,
}: IBurgerConstructorItem): ReactElement {
  const dispatch = useAppDispatch();
  const ref = React.useRef<HTMLDivElement>(null);

  const [{ isDragging }, drag] = useDrag({

    type: 'fillings',
    item: { id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: 'fillings',
    hover(item: any, monitor: any) {
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const node = ref.current!.querySelector('div');
      const hoverBoundingRect = node!.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      // cursor position when it intersects drop target
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) { // downwards
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) { // upwards
        return;
      }

      dispatch(sortFillingsOrder(dragIndex, hoverIndex));
      // eslint-disable-next-line no-param-reassign
      monitor.getItem().index = hoverIndex;
    },
  });

  const removeIngredient = (ingredientKey: string) => {
    dispatch(removeIngredientFromCart(ingredientKey));
  };

  const style = { cursor: 'grabbing' };
  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));

  return (
    <div id={id} className={styles.burgerIngredient} ref={ref} style={{ ...style, opacity }}>
      <div className={styles.dragIcon}><DragIcon type="primary" /></div>
      <ConstructorElement
        isLocked={isLocked}
        text={text}
        price={price}
        thumbnail={thumbnail}
        handleClose={() => removeIngredient(id)}
      />
    </div>
  );
}

export default BurgerConstructorItem;
