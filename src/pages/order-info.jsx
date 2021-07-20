import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import styles from './order-info.module.css'
import { orders } from '../utils/data';

import Price from '../components/price/price';
import IngredientIconRound from '../components/ingredient-icon-round/ingredient-icon-round';
import PropTypes from 'prop-types';


const OrderInfoPage = ({activeOrder}) => { 

    let {id} = useParams();    
    const ingredients = useSelector(store => store.ingredients.items);

    id = id || activeOrder;

    const [order] = orders.filter( item => item.id === id);
    const ingredientsInOrder = ingredients
                                .filter( item => order.ingredientIDs.indexOf(item._id) >= 0)
                                .map( (item, index) => (
                                    <li key={index} className={styles.ingredientInOrder}>
                                        <IngredientIconRound name={item.name} image_mobile={item.image_mobile} customStyle={{position:'relative'}}/>
                                        <span className={styles.ingredientInOrderName}> {item.name} </span>
                                        <Price price={`1 x ${item.price}`}/>
                                    </li>
                                ));

    return (
        <article className={activeOrder ? styles.cardInModal : styles.card}>
            <header>
                <p className={styles.id}>{`#${order.id}`}</p>
                <h2 className={styles.title}> {order.title} </h2>
                <p className={styles[`status_${order.status}`]}> {order.status === 'ready' ? 'Выполнен' : 'В работе'} </p>
            </header>

            <section className={styles.content}>
                <p className={styles.contentTitle}>Состав:</p>
                <ul className={styles.ingredients}> { ingredientsInOrder } </ul>
            </section>

            <footer className={styles.footer}>
                <span className={styles.timestamp}>{order.timestamp}</span>
                <Price price={order.price}/>
            </footer>
            
        </article>
    );
}

export default OrderInfoPage;

OrderInfoPage.propTypes = {
    activeOrder: PropTypes.string
}