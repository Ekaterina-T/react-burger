import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import styles from './burger-constructor-total.module.css';
import Modal from '../../modal/modal';
import OrderDetails from '../../order-details/order-details';
import {CurrencyIcon, Button}  from '@ya.praktikum/react-developer-burger-ui-components';

import {SHOW_ORDER_DETAILS} from '../../../services/actions';
import {createOrder} from '../../../services/actions';


const BurgerConstructorTotal = () => {

    const dispatch = useDispatch();
    const {cart: {bun, fillings}, showOrderDetails} = useSelector(store => store);

    const handleCreateNewOrder = () => {
        dispatch(createOrder());
    }
    
    const closeModal = (e) => {
        e.stopPropagation();
        dispatch({type: SHOW_ORDER_DETAILS, value: false});
    };

    const calcTotal = React.useMemo(
        () => { 
            let result  = 0;

            if(!!bun) {
                result += 2*bun.price;
            }

            if(fillings.length > 0) {
                result += fillings.reduce((acc, filling) => acc + filling.price, 0);
            }

            return result;
        },
        [bun, fillings]
    );

    return (
        <section className={styles.constructor_total}>
            <span> {calcTotal} </span> 
            <CurrencyIcon/>
            <div className={styles.button_wrapper}>
                <Button onClick={handleCreateNewOrder}>Оформить заказ</Button >
                { showOrderDetails && 
                    <Modal key="order" type="order" onClose={closeModal}> 
                        <OrderDetails />
                    </Modal>
                }
            </div>                 
        </section>
    );
}

export default BurgerConstructorTotal;