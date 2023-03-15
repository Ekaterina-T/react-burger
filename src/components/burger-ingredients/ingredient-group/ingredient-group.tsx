import React from 'react';
import styles from './ingredient-group.module.css';

import { TIngredientGroup } from '../../../services/types/index';

interface IIngredientGroupProps {
  data: TIngredientGroup
  children: any
}

function IngredientGroup({ data: { type, name }, children }: IIngredientGroupProps) {
  return (
    <section id={type} key={type} className={styles.group}>

      <header>
        <h3 className={styles.title}>{name}</h3>
      </header>

      <ul className={styles.ingredients}>
        {children}
      </ul>

    </section>
  );
}

export default IngredientGroup;
