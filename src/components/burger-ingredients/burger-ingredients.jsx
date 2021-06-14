import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import styles from './burger-ingredients.module.css';

import IngredientGroup from './ingredient-group/ingredient-group';
import Ingredient from './ingredient/ingredient';
import TabMenu from './tab-menu/tab-menu';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';

import {ingredientGroups} from '../../utils/constants';

import {SHOW_INGREDIENT_DETAILS, SET_ACTIVE_INGREDIENT} from '../../services/actions';


const BurgerIngredients = () => {

    const dispatch = useDispatch();
    const {ingredients, showIngredientDetails} = useSelector(store => store);

    const burgerIngredientsEl = React.useRef(null);  
    
    const openModal = (ingredient) => {
        dispatch({type: SET_ACTIVE_INGREDIENT, value: ingredient});
        dispatch({type: SHOW_INGREDIENT_DETAILS, value: true});
    }

    const closeModal = (e) => {
        e.stopPropagation();
        dispatch({type: SHOW_INGREDIENT_DETAILS, value: false});
        dispatch({type: SET_ACTIVE_INGREDIENT, value: null})
    }

    const getIngredientsFrom = (group) => (
        ingredients
        .filter(ingredient => ingredient.type === group.type)
        .map((ingredient) => {
            return (
                    <Ingredient 
                    key={ingredient._id} 
                    data={ingredient} 
                    openModal = {openModal}/>
                )
            })
    );
    
    return (
        <article className={styles.ingredients} ref={burgerIngredientsEl}>
            <header>
                <h2 className={styles.title}>Соберите бургер</h2>
            </header> 

            <TabMenu burgerIngredientsEl={burgerIngredientsEl}/>
                
            <section className={styles.ingredient_groups}>
                { ingredientGroups.map((group)=>(
                    <IngredientGroup key={group.type} data={group}>   
                        { getIngredientsFrom(group) }                 
                    </IngredientGroup>                                           
                    ))
                } 
            </section>    
            
            { showIngredientDetails && 
                <Modal key="ingredient" type="ingredient" onClose={closeModal}> 
                    <IngredientDetails/>
                </Modal> 
            }           
        </article>
    );
}


export default BurgerIngredients;