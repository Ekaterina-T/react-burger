import styles from './ingredient-icon-round.module.css';

const IngredientIconRound = ({image_mobile, name, customStyle}) => {

    return  <span className={styles.ingredientContainer} style = {customStyle} >
                <img src = {image_mobile} alt = {name}  className={styles.ingredientImg}/>
            </span>

} 

export default IngredientIconRound


