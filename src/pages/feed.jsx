import React from 'react';
import { useSelector } from 'react-redux';

import FeedList from '../components/feed-list/feed-list';
import FeedOverview from '../components/feed-overview/feed-overview';

import styles from './feed.module.css';

function FeedPage() {

    const {data} = useSelector( store => store.orders);

    return (

        <article className={styles.page}  >

            <header> 
                <h2 className={styles.title}>Лента заказов</h2> 
            </header> 

            <section className={styles.contentArea}>
                <FeedList data={data}/>
                <FeedOverview />
            </section>
            
        </article>
        
    );
}

export default FeedPage;
