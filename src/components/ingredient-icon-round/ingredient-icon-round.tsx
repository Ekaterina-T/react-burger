import {FC} from 'react';
import styles from './ingredient-icon-round.module.css';

interface IIngredientIconRoundProps {
    image_mobile: string,
    name: string,
    customStyle: object
}

const IngredientIconRound: FC<IIngredientIconRoundProps> = ({image_mobile, name, customStyle}) => {

    return  <span className={styles.ingredientContainer} style = {customStyle} >
                <img src = {image_mobile} alt = {name}  className={styles.ingredientImg}/>
            </span>

} 

export default IngredientIconRound


