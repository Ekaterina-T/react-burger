import React from 'react';
import { useSelector} from 'react-redux';

import styles from './order-details.module.css';
import OrderDetailsIcon from './order-details-icon'

const OrderDetails = () => {

    const { orderDetails} = useSelector(store => store);
    const notes_main = orderDetails.success ? "Ваш заказ начали готовить": "Заказ не может быть выполнен";
    const notes_sec = orderDetails.success ? "Дождитесь готовности на орбитальной станции": "Обратитесь в поддержку";

    return (

        <section className={styles.info_section}>
            <header className={styles.orderId}>{orderDetails.order.number}</header>
            <p className={styles.orderId_note}>идентификатор заказа</p>

            <OrderDetailsIcon />

            <p className={styles.common_notes_main}>{notes_main}</p>
            <p className={styles.common_notes_sec}>{notes_sec}</p>
        </section>
    );
} 

export default OrderDetails

