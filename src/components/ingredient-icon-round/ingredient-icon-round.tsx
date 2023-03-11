import React from 'react';
import styles from './ingredient-icon-round.module.css';

interface IIngredientIconRoundProps {
  image_mobile: string,
  name: string,
  customStyle: object
}

function IngredientIconRound({ image_mobile, name, customStyle }: IIngredientIconRoundProps) {
  return (
    <span className={styles.ingredientContainer} style={customStyle}>
      <img src={image_mobile} alt={name} className={styles.ingredientImg} />
    </span>
  );
}

export default IngredientIconRound;
