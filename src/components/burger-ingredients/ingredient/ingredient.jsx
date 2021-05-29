import React from 'react';
import styles from './ingredient.module.css';
import {Counter, CurrencyIcon, Button}  from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import {isImageLink} from '../../../utils/prop-type-custom-checks';
import Modal from '../../modal/modal';
import IngredientDetails from '../../modal/ingredient-details/ingredient-details';

class Ingredient extends React.Component {

    constructor(props) {
        super(props);

        this.state = {isModalVisible: false}
    }


    addIngredient = (e) => {
        const ingredient = this.props.data;
        this.props.updateCart(ingredient);
    }

    openModal = (e) => {
        e.preventDefault();
        this.setState( prevState => (
            {...prevState, isModalVisible: true})
        );
    }

    closeModal = (e) => {
        
        e.stopPropagation();
        this.setState( prevState => (
            {...prevState, isModalVisible: false})
        );
    }
    
    //temp function until procedure of adding ingredient is defined
    handleIngredientClick = (e) => {
        //add new ingredient
        if(e.target.nodeName === 'BUTTON') {
            this.addIngredient(e);
        } else { //view details
            this.openModal(e);
        }
    }

    render() {

        const {image, name, price, count} = this.props.data;
    
        return (
           <li className={styles.card} onClick={this.handleIngredientClick}>
    
               { count>0 && <Counter count={count}  size="default"/> }
               <img src={image} alt={name} className={styles.image}/>
               <div className={styles.price}> <span className={styles.price_num}>{price}</span> <CurrencyIcon/> </div>
               <div className={styles.name}>{name}</div>
               <div class_name={styles.btn_wrapper}><Button type="secondary" size="medium">Добавить</Button></div>
                {this.state.isModalVisible && 
                    <Modal key="ingredient" onClose={this.closeModal}> 
                        <IngredientDetails data={this.props.data}/>
                    </Modal>
                }
    
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