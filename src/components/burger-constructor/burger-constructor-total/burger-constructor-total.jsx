import React from 'react';
import styles from './burger-constructor-total.module.css';
import Modal from '../../modal/modal';
import OrderDetails from '../../order-details/order-details';
import {CurrencyIcon, Button}  from '@ya.praktikum/react-developer-burger-ui-components';

import {IngredientsContext} from '../../../services/ingredients-context';
import {orderUrl} from '../../../utils/constants';

import PropTypes from 'prop-types';

const BurgerConstructorTotal = (props) => {

    const modalComponent = React.useRef(null);
    const [isModalVisible, setIsModalVisible] = React.useState(false);

    const {cart: {bun, fillings}} = React.useContext(IngredientsContext);

    const openModal = (e) => { 
        
        fetch(orderUrl, {
            method: "POST", 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({"ingredients": [...fillings, bun].map( item => item._id)})
        })
        .then(res => res.ok ? res.json() : Promise.reject(res.statusText))
        .then(res => {
            console.log("response");
            console.log(res);
            setIsModalVisible(true); 
        })
        .catch( e => {
            console.error(`Something went wrong: ${e}`);
        });
    };
    
    const closeModal = (e) => {
        e.stopPropagation();
        setIsModalVisible(false);
    };

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