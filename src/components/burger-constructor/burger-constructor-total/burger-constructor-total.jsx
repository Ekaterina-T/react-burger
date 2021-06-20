import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import styles from './burger-constructor-total.module.css';
import Modal from '../../modal/modal';
import OrderDetails from '../../order-details/order-details';
import {CurrencyIcon, Button}  from '@ya.praktikum/react-developer-burger-ui-components';

import {ActionTypes} from '../../../services/actionTypes';
import {createOrder} from '../../../services/cart/actions';


const BurgerConstructorTotal = () => {

    const dispatch = useDispatch();
    const {bun, fillings, showOrderDetails} = useSelector(store => store.cart);

    const handleCreateNewOrder = () => {
        dispatch(createOrder()); 
    }
    
    const closeModal = (e) => {
        e.stopPropagation();
        dispatch({type:  ActionTypes.CLOSE_ORDER});
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
                    <Modal type="order" onClose={closeModal}> 
                        <OrderDetails />
                    </Modal>
                }
            </div>                 
        </section>
    );
}

export default BurgerConstructorTotal;