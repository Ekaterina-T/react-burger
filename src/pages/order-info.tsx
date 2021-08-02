import { FC } from 'react';
import { useParams, useLocation } from 'react-router-dom';

import styles from './order-info.module.css'
import { formatOrderNumber } from '../components/utils/order';
import { DateFormatter } from '../utils/date-formatter/date-formatter';
import { socketType } from '../utils/constants';

import Price from '../components/price/price';
import IngredientIconRound from '../components/ingredient-icon-round/ingredient-icon-round';
import { useAppSelector } from '../services/types';

import { TOrder, TIngredient } from '../services/types';

const orderStatusTranslations: {[name:string]: string} = 
                                { done: 'Выполнен', 
                                  inprogress: 'В работе',
                                  cancelled: 'Отменён'
                                };

interface IOrderInfoPageProps {
    activeOrder?: string; 
}

const OrderInfoPage: FC<IOrderInfoPageProps> = ({activeOrder}) => { 

    let {id} = useParams<{id: string | undefined}>();
    const location = useLocation();    
    const ingredientsData = useAppSelector(store => store.ingredients.items);
    const {data} = useAppSelector( store => store.orders[location.pathname.indexOf('/feed')>=0 ? socketType.allOrders : socketType.personalOrders]);
    const orders = data && data.orders;

    if(!orders) {
        return <>Loading</>;
    }

    id = id || activeOrder;

    const [order] = orders.filter( (item:TOrder) => item._id === id);

    const getOrderContent = (ingredientsData: TIngredient[], order:TOrder) => {

        const ingredientsInOrder = ingredientsData.filter( (item:TIngredient) => order.ingredients.indexOf(item._id) >= 0);
        const ingredientCounts = order.ingredients.reduce( (counts: {[name: string] : number}, item: string) => {
                                                                if(counts.hasOwnProperty(item)) {
                                                                    counts[item] += 1;
                                                                } else {
                                                                    counts[item] = 1;
                                                                }
                                                                return counts;
                                                            }, {});
        return ingredientsInOrder.map( (item) => (
                    <li key={item._id} className={styles.ingredientInOrder}>
                        <IngredientIconRound name={item.name} image_mobile={item.image_mobile} customStyle={{position:'relative'}}/>
                            <span className={styles.ingredientInOrderName}> {item.name} </span>
                            <Price price={`${ingredientCounts[item._id]} x ${item.price}`}/>
                    </li>
                ));
    }
                                    
    const price = ingredientsData
                    .filter( item => order.ingredients.indexOf(item._id) >= 0)
                    .reduce( (sum, ingredient) => (sum += ingredient.price), 0);

    return (
        <article className={activeOrder ? styles.cardInModal : styles.card}>
            <header>
                <p className={styles.id}>{`#${formatOrderNumber(order.number)}`}</p>
                <h2 className={styles.title}> {order.name} </h2>
                <p className={styles[`status_${order.status}`]}> {orderStatusTranslations[order.status]} </p>
            </header>

            <section className={styles.content}>
                <p className={styles.contentTitle}>Состав:</p>
                <ul className={styles.ingredients}> { getOrderContent(ingredientsData, order) } </ul>
            </section>

            <footer className={styles.footer}>
                <span className={styles.timestamp}>{DateFormatter.getRelativeFormat(order.updatedAt)}</span>
                <Price price={price}/>
            </footer>
            
        </article>
    );
}

export default OrderInfoPage;