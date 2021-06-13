import React from 'react';
import styles from './order-details.module.css';
import PropTypes from 'prop-types';
import OrderDetailsIcon from './order-details-icon'

const OrderDetails = ({orderData}) => {

    const notes_main = orderData.success ? "Ваш заказ начали готовить": "Заказ не может быть выполнен";
    const notes_sec = orderData.success ? "Дождитесь готовности на орбитальной станции": "Обратитесь в поддержку";

    return (

        <section className={styles.info_section}>
            <header className={styles.orderId}>{orderData.order.number}</header>
            <p className={styles.orderId_note}>идентификатор заказа</p>

            <OrderDetailsIcon />

            <p className={styles.common_notes_main}>{notes_main}</p>
            <p className={styles.common_notes_sec}>{notes_sec}</p>
        </section>
    );
} 

export default OrderDetails

OrderDetails.propTypes = {
    orderData: PropTypes.shape({
        name: PropTypes.string.isRequired,
        order: PropTypes.shape({
            number: PropTypes.number.isRequired
        }),
        success: PropTypes.bool
    }).isRequired
}
