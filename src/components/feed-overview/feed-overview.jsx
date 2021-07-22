import React from 'react';
import { useSelector } from 'react-redux';

import OrderIDList from './orderid-list/order-id-list';
import FeedInfo from './feed-info/feed-info';

import styles from './feed-overview.module.css';

const MAX_NUM_OF_VISIBLE_ORDERS = 10;

const FeedOverview = () => {

    const {data} = useSelector( store => store.orders);

    const orders = data && data.orders || [];
    const total = data && data.total || 0;
    const totalToday = data && data.totalToday || 0;
  
    const readyOrders = orders.filter( (item, index) => item.status === "done" && index < MAX_NUM_OF_VISIBLE_ORDERS);
    const inProgressOrders = orders.filter( (item, index) => item.status === "inprogress" && index < MAX_NUM_OF_VISIBLE_ORDERS);

    return (

        <section className={styles.overview}>
            
            <article className={styles.content}>

                <div className={styles.contentRow}>                
                    <div className={styles.contentRow__item}> <OrderIDList orders={readyOrders} title={'Готовы'} type={'green'}/> </div>
                    <div className={styles.contentRow__item}> <OrderIDList orders={inProgressOrders} title={'В работе'} /> </div>
                </div>

                <div className={styles.contentRow}> <FeedInfo label={'Выполнено за все время:'} value={total}/> </div>
                <div className={styles.contentRow}> <FeedInfo label={'Выполнено за сегодня:'} value={totalToday}/> </div>

            </article>
            
        </section>   
    ); 
}

export default FeedOverview;

