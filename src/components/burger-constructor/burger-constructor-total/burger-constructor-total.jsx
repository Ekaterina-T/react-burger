import React from 'react';
import styles from './burger-constructor-total.module.css';
import Modal from '../../modal/modal';
import OrderDetails from '../../modal/order-details/order-details';
import {CurrencyIcon, Button}  from '@ya.praktikum/react-developer-burger-ui-components';
//import { render } from '@testing-library/react';
import PropTypes from 'prop-types';

const BurgerConstructorTotal = (props) => {

    const modalComponent = React.useRef(null);
    const [isModalVisible, setIsModalVisible] = React.useState(false);

    const openModal = (e) => {
        setIsModalVisible(true);
    }
    
    const closeModal = (e) => {
        e.stopPropagation();
        setIsModalVisible(false);
    }

    const {total} = props;

    return (
        <section className={styles.constructor_total}>
            <span> {total} </span> 
            <CurrencyIcon/>
            <div className={styles.button_wrapper}>
                <Button onClick={openModal}>Оформить заказ</Button >
                { isModalVisible && 
                    <Modal key="order" type="order" onClose={closeModal} modalComponent={modalComponent}> 
                        <OrderDetails orderId="034536" />
                    </Modal>
                }
            </div>                 
        </section>
    );
}

BurgerConstructorTotal.propTypes = {
    total: PropTypes.number.isRequired
};


export default BurgerConstructorTotal;