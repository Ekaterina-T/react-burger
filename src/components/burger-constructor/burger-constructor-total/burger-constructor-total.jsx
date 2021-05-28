import React from 'react';
import styles from './burger-constructor-total.module.css';
import Modal from '../../modal/modal';
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
        
        const closeModal = () => {
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
                        <Modal header="Внимание!" onClose={closeModal}> 
                            <p>Спасибо за внимание!</p>
                            <p>Открывай меня, если станет скучно :)</p>
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