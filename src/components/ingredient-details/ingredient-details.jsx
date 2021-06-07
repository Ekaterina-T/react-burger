import React from 'react';
import styles from './ingredient-details.module.css';
import PropTypes from 'prop-types';
import {isImageLink} from '../../utils/prop-type-custom-checks';

const IngredientDetails = (props) => {
   
    const {name, calories, proteins, fat, carbohydrates, image_large} = props.data;

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

IngredientDetails.propTypes = {

    data: PropTypes.shape({
            name: PropTypes.string,
            calories: PropTypes.number,
            proteins: PropTypes.number,
            fat: PropTypes.number,
            carbohydrates: PropTypes.number,
            image_large: isImageLink
        }).isRequired
}
