import React, { useState, FC } from 'react';
import {useRouteMatch, Link, useLocation, useHistory} from 'react-router-dom';

import styles from './feed-list.module.css';
import OrderCard from '../order-card/order-card';
import { OrderInfoPage } from '../../pages';
import Modal from '../modal/modal';

import { TOrder } from '../../services/types/index';

interface IFeedListProps {
    owner: 'profile';
    data: { 
        orders: Array<TOrder>
    }
}

const FeedList: FC<IFeedListProps> = ({owner, data}) => {

    const [showOrderInfo, setShowOrderInfo] = useState(false);
    const [activeOrder, setActiveOrder] = useState<string | null>(null);

    const orders = data.orders;
    
    const {url} = useRouteMatch();
    const location = useLocation();
    const history = useHistory();
    const fallbackMsg = owner ==='profile' ? 'Вы ещё ничего не заказывали' : 'Грузим данные';
    
    const openModal = (id: string) => {
        setShowOrderInfo(true);
        setActiveOrder(id);
    }

    const closeModal = (e: React.MouseEvent | React.KeyboardEvent) => {
        e.stopPropagation();
        setShowOrderInfo(false);
        setActiveOrder(null);
        history.goBack();
    }
    
    return (
        <article className={owner==='profile' ? styles.orders__profile  : styles.orders}>
            { 
            orders.length > 0 ? 
            orders.map( order => ( 
                <Link key = {order._id} to={{ pathname: `${url}/${order._id}`, state: { background: location } }} className={styles.link} >
                    <OrderCard data = {order} openModal={openModal}/> 
                </Link>
            )) 
            : <p>{ fallbackMsg }</p>
            }

            { showOrderInfo && 
                <Modal type="orderInfo" onClose={closeModal} > 
                    <OrderInfoPage activeOrder={activeOrder} />
                </Modal> 
            }   
            
        </article>   
    ); 
}

export default FeedList;
