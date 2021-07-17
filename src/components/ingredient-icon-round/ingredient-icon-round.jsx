import styles from './ingredient-icon-round.module.css';

import PropTypes from 'prop-types';
import { isImageLink } from '../../utils/prop-type-custom-checks';

const IngredientIconRound = ({image_mobile, name, customStyle}) => {

    return  <span className={styles.ingredientContainer} style = {customStyle} >
                <img src = {image_mobile} alt = {name}  className={styles.ingredientImg}/>
            </span>

} 

export default IngredientIconRound

IngredientIconRound.propTypes = {
    image_mobile: isImageLink,
    name: PropTypes.string.isRequired,
    customStyle: PropTypes.object
}


