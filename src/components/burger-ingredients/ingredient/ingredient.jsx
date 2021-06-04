import React from 'react';
import styles from './ingredient.module.css';
import {Counter, CurrencyIcon, Button}  from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import {isImageLink} from '../../../utils/prop-type-custom-checks';
import Modal from '../../modal/modal';
import IngredientDetails from '../../ingredient-details/ingredient-details';

const Ingredient = (props) => {
    
    const modalComponent = React.useRef(null);
    const [isModalVisible, setIsModalVisible] = React.useState(false);

    const addIngredient = (e) => {
        const ingredient = props.data;
        updateCart(ingredient);
    }

    const openModal = (e) => {
        setIsModalVisible(true);
    }

    const closeModal = (e) => {
        e.stopPropagation();
        setIsModalVisible(false);
    }
    
    //temp function until procedure of adding ingredient is defined
    const handleIngredientClick = (e) => {
        //add new ingredient
        if(e.target.nodeName === 'BUTTON') {
            addIngredient(e);
        } else { //view details
            openModal(e);
        }
    }

    const {image, name, price, count} = props.data;
    const updateCart = props.updateCart;

    return (
        <li className={styles.card} onClick={handleIngredientClick}>
 
            { count>0 && <Counter count={count}  size="default"/> }
            <img src={image} alt={name} className={styles.image}/>
            <div className={styles.price}> <span className={styles.price_num}>{price}</span> <CurrencyIcon/> </div>
            <div className={styles.name}>{name}</div>
            <div className={styles.add_btn}><Button type="secondary" size="medium">Добавить</Button></div>
            { isModalVisible && 
                <Modal key="ingredient" type="ingredient" onClose={closeModal} modalComponent={modalComponent}> 
                    <IngredientDetails data={props.data}/>
                </Modal> 
            }

        </li>
    );
}

Ingredient.propTypes = {
    data: PropTypes.shape({
        image: isImageLink,
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        count: PropTypes.number.isRequired
        }
    ).isRequired,
    updateCart: PropTypes.func.isRequired
    
};

export default Ingredient;