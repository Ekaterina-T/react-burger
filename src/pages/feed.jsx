import React from 'react';
import FeedList from '../components/feed-list/feed-list';
import FeedOverview from '../components/feed-overview/feed-overview';

import styles from './feed.module.css';

function FeedPage() {


    return (

        <article className={styles.page}  >

            <header> 
                <h2 className={styles.title}>Лента заказов</h2> 
            </header> 

            <section className={styles.contentArea}>
                <FeedList />
                <FeedOverview />
            </section>
            
        </article>
        
    );
}

export default FeedPage;
