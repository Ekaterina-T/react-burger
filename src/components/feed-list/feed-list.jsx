import React from 'react';

import styles from './feed-list.module.css';
import {orders}  from '../../utils/data';
import OrderCard from '../order-card/order-card';

const FeedList = ({owner}) => {

    const feedHasItems = orders.length > 0;  
    
    return (

        <article className={owner==='profile' ? styles.orders__profile  : styles.orders}>
            { 
            feedHasItems ? 
            orders.map( order => ( <OrderCard key = {order.id} data = {order}/> )) 
            : <p>Вы ещё ничего не заказывали</p>
            }
            
        </article>   
    ); 
}

export default FeedList;

