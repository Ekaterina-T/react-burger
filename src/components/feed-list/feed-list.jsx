import React, { useState } from 'react';
import {useRouteMatch, Link, useLocation} from 'react-router-dom';

import styles from './feed-list.module.css';
import {orders}  from '../../utils/data';
import OrderCard from '../order-card/order-card';
import { OrderInfoPage } from '../../pages';
import Modal from '../modal/modal';

import PropTypes from 'prop-types';

const FeedList = ({owner}) => {

    const [showOrderInfo, setShowOrderInfo] = useState(false);
    const [activeOrder, setActiveOrder] = useState(null);

    const feedHasItems = orders.length > 0;  
    const {url} = useRouteMatch();
    const location = useLocation();

    const openModal = (id) => {
        setShowOrderInfo(true);
        setActiveOrder(id);
    }

    const closeModal = (e) => {
        e.stopPropagation();
        setShowOrderInfo(false);
        setActiveOrder(null);
    }
    
    return (

        <article className={owner==='profile' ? styles.orders__profile  : styles.orders}>
            { 
            feedHasItems ? 
            orders.map( order => ( 
                <Link key = {order.id} to={{ pathname: `${url}/${order.id}`, state: { background: location } }} className={styles.link} >
                    <OrderCard data = {order} openModal={openModal}/> 
                </Link>
            )) 
            : <p>Вы ещё ничего не заказывали</p>
            }

            { showOrderInfo && 
                <Modal type="orderInfo" onClose={closeModal} > 
                    <OrderInfoPage activeOrder={activeOrder}/>
                </Modal> 
            }   
            
        </article>   
    ); 
}

export default FeedList;

FeedList.propTypes = {
    owner: PropTypes.oneOf(['profile'])
}

