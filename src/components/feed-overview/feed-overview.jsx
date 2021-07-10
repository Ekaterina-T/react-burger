import React from 'react';

import OrderIDList from './orderid-list/order-id-list';
import FeedInfo from './feed-info/feed-info';

import styles from './feed-overview.module.css';
import {orders}  from '../../utils/data';

const FeedOverview = () => {
  
    const readyOrders = orders.filter( item => item.status === "ready");
    const inProgressOrders = orders.filter( item => item.status === "inprogress");

    return (

        <section className={styles.overview}>
            
            <article className={styles.content}>

                <div className={styles.contentRow}>                
                    <div className={styles.contentRow__item}> <OrderIDList orders={readyOrders} title={'Готовы'} type={'green'}/> </div>
                    <div className={styles.contentRow__item}> <OrderIDList orders={inProgressOrders} title={'В работе'} /> </div>
                </div>

                <div className={styles.contentRow}> <FeedInfo label={'Выполнено за все время:'} value={'28 752'}/> </div>
                <div className={styles.contentRow}> <FeedInfo label={'Выполнено за сегодня:'} value={'138'}/> </div>

            </article>
            
        </section>   
    ); 
}

export default FeedOverview;

