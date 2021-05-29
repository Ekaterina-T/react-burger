import React from 'react';
import styles from './burger-constructor-total.module.css';
import Modal from '../../modal/modal';
import OrderDetails from '../../modal/order-details/order-details';
import {CurrencyIcon, Button}  from '@ya.praktikum/react-developer-burger-ui-components';
//import { render } from '@testing-library/react';
import PropTypes from 'prop-types';

class BurgerConstructorTotal extends React.Component {

    constructor(props) {
        super(props);

        this.state = {isModalVisible: false};
    }

    openModal = (e) => {
        e.preventDefault();
        this.setState( prevState => (
            {...prevState, isModalVisible: true})
        );
    }
    
    closeModal = (e) => {

        e.stopPropagation();
        this.setState( prevState => (
            {...prevState, isModalVisible: false})
        ); 
    }

    render() {

        const {total} = {...this.props};

        return (

           <section className={styles.constructor_total}>
               <span> {total} </span> 
               <CurrencyIcon/>
               <div className={styles.button_wrapper}>
                   <Button onClick={this.openModal}>Оформить заказ</Button >
                   {this.state.isModalVisible && 
                        <Modal key="total" onClose={this.closeModal}> 
                            <OrderDetails orderId="034536" />
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