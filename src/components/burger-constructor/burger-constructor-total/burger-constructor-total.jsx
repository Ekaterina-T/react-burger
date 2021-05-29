import React from 'react';
import styles from './burger-constructor-total.module.css';
import Modal from '../../modal/modal';
import OrderConfirm from '../../modal/order-confirm/order-confirm';
import {CurrencyIcon, Button}  from '@ya.praktikum/react-developer-burger-ui-components';
//import { render } from '@testing-library/react';
import PropTypes from 'prop-types';

class BurgerConstructorTotal extends React.Component {

    constructor(props) {
        super(props);

        this.state = {isModalVisible: false};
    }

    render() {

        const {total} = {...this.props};

        const openModal = (e) => {
            e.preventDefault();
            this.setState( prevState => (
                {...prevState, isModalVisible: true})
            );
        }
        
        const closeModal = (e) => {
            e.preventDefault();
            this.setState( prevState => (
                {...prevState, isModalVisible: false})
            );
        }
    
        return (

           <section className={styles.constructor_total}>
               <span> {total} </span> 
               <CurrencyIcon/>
               <div className={styles.button_wrapper}>
                   <Button onClick={openModal}>Оформить заказ</Button >
                   {this.state.isModalVisible && 
                        <Modal onClose={closeModal}> 
                            <OrderConfirm orderId="034536" />
                        </Modal>
                    }
               </div>                 
            </section>
        );

    } 
}

BurgerConstructorTotal.propTypes = {
    total: PropTypes.number.isRequired
};


export default BurgerConstructorTotal;