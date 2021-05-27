import React from 'react';
import styles from './burger-constructor-total.module.css';
import {CurrencyIcon, Button}  from '@ya.praktikum/react-developer-burger-ui-components';
//import { render } from '@testing-library/react';
import PropTypes from 'prop-types';

class BurgerConstructorTotal extends React.Component {

    /*constructor(props) {
        super(props);
    }*/

    render() {

        const {total} = {...this.props};
    
        return (

           <section className={styles.constructor_total}>

               <span> {total} </span> 
               <CurrencyIcon/>
               <div className={styles.button_wrapper}> <Button >Оформииь заказ</Button > </div>
                 
            </section>
        );

    } 
}

BurgerConstructorTotal.propTypes = {
    total: PropTypes.number.isRequired
};


export default BurgerConstructorTotal;