import styles from './orderid-list.module.css'
import { formatOrderNumber } from '../../utils/order';

import PropTypes from 'prop-types';

const OrderIDList = ({orders, title, type}) => {

    const drawOrderItem = item => ( <li key={item._id} className={styles.listItem}>{formatOrderNumber(item.number)}</li> );

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

OrderIDList.propTypes = {
    orders: PropTypes.arrayOf(PropTypes.object).isRequired,
    title: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['green'])
}