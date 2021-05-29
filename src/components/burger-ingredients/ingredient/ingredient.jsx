import React from 'react';
import styles from './ingredient.module.css';
import {Counter, CurrencyIcon, Button}  from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import {isImageLink} from '../../../utils/prop-type-custom-checks';
import Modal from '../../modal/modal';
import IngredientDetails from '../../modal/ingredient-details/ingredient-details';

const Ingredient = (props) => {

    const [isModalVisible, setIsModalVisible] = React.useState(false);

    const addIngredient = (e) => {
        const ingredient = props.data;
        props.updateCart(ingredient);
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

    return (
        <li className={styles.card} onClick={handleIngredientClick}>

            { count>0 && <Counter count={count}  size="default"/> }
            <img src={image} alt={name} className={styles.image}/>
            <div className={styles.price}> <span className={styles.price_num}>{price}</span> <CurrencyIcon/> </div>
            <div className={styles.name}>{name}</div>
            <div class_name={styles.btn_wrapper}><Button type="secondary" size="medium">Добавить</Button></div>
            { isModalVisible && 
                <Modal key="ingredient" onClose={closeModal}> 
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
        count: PropTypes.number.isRequired,
        updateCart: PropTypes.func.isRequired
        }
    ).isRequired
    
};

export default Ingredient;