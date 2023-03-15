import React, { ReactElement } from 'react';
import { useDrag, useDrop, DropTargetMonitor } from 'react-dnd';

import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-constructor-item.module.css';

import { removeIngredientFromCart, sortFillingsOrder, addIngredientToCart } from '../../../services/cart/actions';
import { useAppDispatch } from '../../../services/types';
import Placeholder from '../../placeholder/placeholder';

interface IBurgerConstructorItem {
  type?: 'top' | 'bottom' | undefined;
  index: number;
  id: string;
  text: string;
  price: number;
  thumbnail: string;
  isLocked: boolean;
}

interface IItem {
  id: string;
  index?: number;
  type: 'bun' | 'filling' | 'sauce'
}

function BurgerConstructorItem({
  type, index, id, text, price, thumbnail, isLocked,
}: IBurgerConstructorItem): ReactElement {
  const dispatch = useAppDispatch();
  const refWrapper = React.useRef<HTMLDivElement>(null);
  const refIngredient = React.useRef<HTMLDivElement>(null);

  const isHoverOver = (monitor: DropTargetMonitor):boolean => {
    if (!monitor.isOver()) return false;

    const draggedItem: IItem = monitor.getItem();

    if (draggedItem.type === 'bun') return false;

    const draggedIndex = (!draggedItem.index && draggedItem.index !== 0) ? null : draggedItem.index;

    // moving around an already added ingredient
    if (draggedIndex !== null && draggedIndex >= 0 && draggedIndex === index) {
      return false;
    }

    return true;
  };

  const swapFillings = (item: any, monitor: any) => {
    if (!isHoverOver(monitor)) return;

    const dragIndex = item.index;
    const hoverIndex = index;

    if ((hoverIndex !== 0 && !hoverIndex) || dragIndex === hoverIndex) return;

    dispatch(sortFillingsOrder(dragIndex, hoverIndex));
    // eslint-disable-next-line no-param-reassign
    monitor.getItem().index = hoverIndex;
  };

  const addNewFilling = (item: any, monitor: any) => {
    if (!isHoverOver(monitor)) return;
    const hoverIndex = index;

    if (hoverIndex !== 0 && !hoverIndex) return;

    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    dispatch(addIngredientToCart(item.id, isDragUp ? hoverIndex : hoverIndex + 1));
    // eslint-disable-next-line no-param-reassign
    monitor.getItem().index = hoverIndex;
  };

  const isDraggingDown = (monitor: DropTargetMonitor):boolean => {
    if (!isHoverOver(monitor)) return false;

    /**
     * When the dragged element crosses drop-target element for the 1st time,
     * DnD fires event and calls isDraggingDown.
     * When the pointer leaves current drop-target no event fires.
     * At 1st time we define pointer direction and render "empty placeholder" in new position.
     * After that re-render happens => wrapper container !== drop-target container.
     * => We need to re-confirm direction of pointer.
     */

    const wrapperRect = refWrapper.current && refWrapper.current.getBoundingClientRect();
    const dropTargetRect = refIngredient.current && refIngredient.current.getBoundingClientRect();

    const dragCursorPos = monitor.getClientOffset();

    if (!wrapperRect || !dropTargetRect || !dragCursorPos) return false;

    if (wrapperRect.top === dropTargetRect.top && wrapperRect.bottom === dropTargetRect.bottom) {
      // 1st render - before empty space is rendered
      const distToTop = Math.abs(dragCursorPos.y - wrapperRect.top);
      const distToBottom = Math.abs(dragCursorPos.y - wrapperRect.bottom);
      return distToTop < distToBottom;
    }
    // 2nd render - after empty space is rendered
    return wrapperRect.top === dropTargetRect.top;
  };

  const [{
    isDragDown, isDragUp,
  }, drop] = useDrop({
    accept: ['fillings', 'ingredient'],
    drop(item: any, monitor: DropTargetMonitor) {
      if (monitor.getItemType() === 'fillings') {
        swapFillings(item, monitor);
      } else {
        addNewFilling(item, monitor);
      }
    },
    collect: (monitor) => {
      const isDown = isDraggingDown(monitor);
      return { isDragDown: isDown, isDragUp: isHoverOver(monitor) && !isDown };
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: 'fillings',
    item: { id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const removeIngredient = (ingredientKey: string) => {
    dispatch(removeIngredientFromCart(ingredientKey));
  };

  const style = { cursor: 'grabbing' };
  const opacity = isDragging ? 0 : 1;
  drag(drop(refWrapper));

  return (
    <div ref={refWrapper}>
      { isDragUp && <Placeholder /> }

      <div
        ref={refIngredient}
        id={id}
        className={styles.burgerIngredient}
        style={{ ...style, opacity }}
      >
        <div className={styles.dragIcon}>
          <DragIcon type="primary" />
        </div>
        <ConstructorElement
          type={type}
          isLocked={isLocked}
          text={text}
          price={price}
          thumbnail={thumbnail}
          handleClose={() => removeIngredient(id)}
        />
      </div>

      { isDragDown && <Placeholder /> }

    </div>
  );
}

export default BurgerConstructorItem;
