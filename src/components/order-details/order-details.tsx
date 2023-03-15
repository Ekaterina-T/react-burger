import React from 'react';
import { useAppSelector } from '../../services/types';

import styles from './order-details.module.css';
import OrderDetailsIcon from './order-details-icon';

function OrderDetails() {
  const { orderDetails } = useAppSelector((store) => store.cart);
  const notesMain = orderDetails?.success ? 'Ваш заказ начали готовить' : 'Заказ не может быть выполнен';
  const notesSec = orderDetails?.success ? 'Дождитесь готовности на орбитальной станции' : 'Обратитесь в поддержку';

  return (
    <section className={styles.info_section}>
      <header className={styles.orderId}>{orderDetails?.order.number}</header>
      <p className={styles.orderId_note}>идентификатор заказа</p>

      <OrderDetailsIcon />

      <p className={styles.common_notes_main}>{notesMain}</p>
      <p className={styles.common_notes_sec}>{notesSec}</p>
    </section>
  );
}

export default OrderDetails;
