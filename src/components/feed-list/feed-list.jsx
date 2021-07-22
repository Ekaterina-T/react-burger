import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {useRouteMatch, Link, useLocation, useHistory} from 'react-router-dom';

import styles from './feed-list.module.css';
//import {orders}  from '../../utils/data';
import OrderCard from '../order-card/order-card';
import { OrderInfoPage } from '../../pages';
import Modal from '../modal/modal';

import PropTypes from 'prop-types';

const FeedList = ({owner, data}) => {

    const [showOrderInfo, setShowOrderInfo] = useState(false);
    const [activeOrder, setActiveOrder] = useState(null);

    const orders = data && data.orders;
    
    const {url} = useRouteMatch();
    const location = useLocation();
    const history = useHistory();


    const openModal = (id) => {
        setShowOrderInfo(true);
        setActiveOrder(id);
    }

    const closeModal = (e) => {
        e.stopPropagation();
        setShowOrderInfo(false);
        setActiveOrder(null);
        history.goBack();
    }
    
    return (

        <article className={owner==='profile' ? styles.orders__profile  : styles.orders}>
            { 
            !!orders ? 
            orders.map( order => ( 
                <Link key = {order._id} to={{ pathname: `${url}/${order._id}`, state: { background: location } }} className={styles.link} >
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
    owner: PropTypes.oneOf(['profile']),
    data: PropTypes.object //TODO describe the object
}

