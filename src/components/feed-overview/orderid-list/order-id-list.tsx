import { FC } from 'react'; 
import styles from './orderid-list.module.css'
import { formatOrderNumber } from '../../utils/order';
import { TOrder } from '../../../services/types/index';

interface IOrderIDListProps {
    orders: Array<TOrder>;
    title: string;
    type?: 'green';
}

const OrderIDList: FC<IOrderIDListProps> = ({orders, title, type}) => {

    const drawOrderItem = (item:TOrder) => ( <li key={item._id} className={styles.listItem}>{formatOrderNumber(item.number)}</li> );

    return  (
        <section className={styles.orderList}> 
            <header className={styles.listTitle}>{title}</header>
            <ul className={styles[`itemColor_${type}`]}>
                {
                    orders.map(drawOrderItem)
                }
            </ul>
        </section>
    )
}


export default OrderIDList;