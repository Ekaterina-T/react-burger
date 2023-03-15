import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-constructor-total.module.css';
import Modal from '../../modal/modal';
import OrderDetails from '../../order-details/order-details';

import { ActionTypes } from '../../../services/actionTypes';
import { createOrder } from '../../../services/cart/actions';

import { useAppSelector, useAppDispatch } from '../../../services/types';

function BurgerConstructorTotal() {
  const dispatch = useAppDispatch();
  const { bun, fillings, showOrderDetails } = useAppSelector((store) => store.cart);
  const { loginSuccess } = useAppSelector((store) => store.user);
  const { createOrderInProgress } = useAppSelector((store) => store.cart);

  const history = useHistory();
  const location = useLocation();

  const handleCreateNewOrder = () => {
    if (!loginSuccess) {
      history.replace({ pathname: '/login', state: { target: location } });
      return;
    }

    dispatch(createOrder());
  };

  const closeModal = (e: React.MouseEvent | React.KeyboardEvent) => {
    e.stopPropagation();
    dispatch({ type: ActionTypes.CLOSE_ORDER });
  };

  const calcTotal = React.useMemo(
    () => {
      let result = 0;

      if (bun) {
        result += 2 * bun.price;
      }

      if (fillings.length > 0) {
        result += fillings.reduce((acc, filling) => acc + filling.price, 0);
      }

      return result;
    },
    [bun, fillings],
  );

  return (
    <section className={styles.constructor_total}>
      <span>

        {calcTotal}

      </span>
      <CurrencyIcon type="secondary" />
      <div className={styles.button_wrapper}>
        { (bun && !createOrderInProgress)
        && <Button onClick={handleCreateNewOrder}>Оформить заказ</Button> }
        { createOrderInProgress
        && <span className={styles.info_important}> Ожидайте подтверждения заказа </span> }
        { showOrderDetails
                    && (
                    <Modal type="order" onClose={closeModal}>
                      <OrderDetails />
                    </Modal>
                    )}
      </div>
    </section>
  );
}

export default BurgerConstructorTotal;
