import styles from './orderid-list.module.css'

const OrderIDList = ({orders, title, type}) => {

    const drawOrderItem = item => ( <li key={item.id} className={styles.listItem}>{item.id}</li> );

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