import React from 'react';
import { useSelector} from 'react-redux';

import styles from './ingredient-details.module.css';

const IngredientDetails = () => {
   
    const {activeIngredient} = useSelector(store => store.ingredients);
    const {name, calories, proteins, fat, carbohydrates, image_large} = activeIngredient;

    const nutritionItems = [
        {id: "calories", title: "Калории, ккал", value: calories},
        {id: "proteins", title: "Белки, г", value: proteins},
        {id: "fat", title: "Жиры, г", value: fat},
        {id: "carbohydrates", title: "Углеводы, г", value: carbohydrates}
    ];

    return (

        <section className={styles.details_section}>

            <header className={styles.details_header}>Детали ингредиента</header>
            <img src={image_large} alt={name}/>
            <h4 className={styles.details_title}>{name}</h4>

            <dl className={styles.nutrition_info}>

                { nutritionItems.map( item => (
                    <div key={item.id} className={styles.nutrition_item}>
                        <dt className={styles.nutrition_title}> {item.title} </dt> 
                        <dd className={styles.nutrition_val}> {item.value} </dd>
                    </div>
                    ))
                }                  
            </dl>
        </section>
    );

} 

export default IngredientDetails