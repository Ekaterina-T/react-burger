import React from 'react';
import styles from './ingredient.module.css';
import {Counter, CurrencyIcon, Button}  from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import {isImageLink} from '../../../utils/prop-type-custom-checks';

class Ingredient extends React.Component {

    /*
    constructor(props) {
        super(props);
    }*/

    addIngredient = () => {
        const ingredient = this.props.data;
        this.props.updateCart({...ingredient, count: ingredient.count+1});
    }

    render() {

        const {image, name, price, count} = {...this.props.data};
    
        return (
           <li className={styles.card} onClick={this.addIngredient}>
    
               { count>0 && <Counter count={count}  size="default"/> }
               <img src={image} alt={name} className={styles.image}/>
               <div className={styles.price}> <span className={styles.price_num}>{price}</span> <CurrencyIcon/> </div>
               <div className={styles.name}>{name}</div>
               <div class_name={styles.btn_wrapper}><Button type="secondary" size="medium">Добавить</Button></div>
    
            </li>
        );

    } 
}

Ingredient.propTypes = {
    data: PropTypes.shape({
        image: isImageLink,
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        count:PropTypes.number.isRequired
        }
    ).isRequired
    
};

export default Ingredient;