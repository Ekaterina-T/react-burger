/* eslint-disable react/jsx-no-useless-fragment */
import React from 'react';

// eslint-disable-next-line import/no-cycle
import FeedList from '../components/feed-list/feed-list';
import FeedOverview from '../components/feed-overview/feed-overview';
import { socketType } from '../utils/constants';

import styles from './feed.module.css';

import { useAppSelector } from '../services/types';

function FeedPage(): React.ReactElement | null {
  const { data } = useAppSelector((store) => store.orders[socketType.allOrders]);

  return (
    <>
      {
      data
        ? (
          <article className={styles.page}>
            <header>
              <h2 className={styles.title}>Лента заказов</h2>
            </header>

            <section className={styles.contentArea}>
              <FeedList data={data} />
              <FeedOverview />
            </section>
          </article>
        )
        : <></>
      }
    </>
  );
}

export default FeedPage;
