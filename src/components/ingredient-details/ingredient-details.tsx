/* eslint-disable no-underscore-dangle */
import React from 'react';
import { useParams } from 'react-router-dom';

import { useAppSelector } from '../../services/types';

import styles from './ingredient-details.module.css';

function IngredientDetails(): React.ReactElement | null {
  const { id } = useParams<{ id:string }>();
  const { items } = useAppSelector((store) => store.ingredients);

  const activeIngredientFromStore = useAppSelector((store) => store.ingredients.activeIngredient);
  const activeIngredientFromUrl = id ? items.find((item) => item._id === id) : null;
  const activeIngredient = activeIngredientFromUrl || activeIngredientFromStore;

  if (!activeIngredient) {
    return null;
  }

  const {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    name, calories, proteins, fat, carbohydrates, image_large,
  } = activeIngredient;

  const nutritionItems = [
    { id: 'calories', title: 'Калории, ккал', value: calories },
    { id: 'proteins', title: 'Белки, г', value: proteins },
    { id: 'fat', title: 'Жиры, г', value: fat },
    { id: 'carbohydrates', title: 'Углеводы, г', value: carbohydrates },
  ];

  return (
    <section className={styles.details_section}>

      <header className={styles.details_header}>Детали ингредиента</header>
      <img src={image_large} alt={name} />
      <h4 className={styles.details_title}>{name}</h4>

      <dl className={styles.nutrition_info}>

        { nutritionItems.map((item) => (
          <div key={item.id} className={styles.nutrition_item}>
            <dt className={styles.nutrition_title}>

              {item.title}

            </dt>
            <dd className={styles.nutrition_val}>

              {item.value}

            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

export default IngredientDetails;
