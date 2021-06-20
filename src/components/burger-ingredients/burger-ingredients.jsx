import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import styles from './burger-ingredients.module.css';

import IngredientGroup from './ingredient-group/ingredient-group';
import Ingredient from './ingredient/ingredient';
import TabMenu from './tab-menu/tab-menu';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';

import {ingredientGroups} from '../../utils/constants';

import {ActionTypes} from '../../services/actionTypes';



const BurgerIngredients = () => {

    const [currentTab, setCurrentTab] = React.useState('bun');
    
    const dispatch = useDispatch();
    const {items, showIngredientDetails} = useSelector(store => store.ingredients);

    const burgerIngredientsEl = React.useRef(null);  
    
    const openModal = (ingredient) => {
        dispatch({type:  ActionTypes.SET_ACTIVE_INGREDIENT, value: ingredient});
        dispatch({type:  ActionTypes.SHOW_INGREDIENT_DETAILS, value: true});
    }

    const closeModal = (e) => {
        e.stopPropagation();
        dispatch({type:  ActionTypes.SHOW_INGREDIENT_DETAILS, value: false});
        dispatch({type:  ActionTypes.SET_ACTIVE_INGREDIENT, value: null})
    }

    const getIngredientsFrom = (group) => (
        items
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

    const updateActiveTabOnScroll = (e) => {

        const isClosestHeaderVisible = (section, sectionIndex, allSections) => {

            if(sectionIndex === allSections.length-1) { //last section is active
                return true;
            }
            
            const sectionRect = section.querySelector('ul').getBoundingClientRect();
            return sectionRect.y >= scrollableAreaTop;
        }

        const scrollableArea = e.target;
        const scrollableAreaTop = scrollableArea.getBoundingClientRect().y;
        const ingredientGroups = Array.prototype.slice.call(scrollableArea.querySelectorAll('section'));

        const visibleGroup = ingredientGroups.find(isClosestHeaderVisible);

        setCurrentTab(visibleGroup.getAttribute('id'));
    };
    
    return (
        <article className={styles.ingredients}>
            <header>
                <h2 className={styles.title}>Соберите бургер</h2>
            </header> 

            <TabMenu burgerIngredientsEl={burgerIngredientsEl} currentTab={currentTab} updateCurrentTab={setCurrentTab}/>
                
            <section className={styles.ingredient_groups} ref={burgerIngredientsEl} onScroll={updateActiveTabOnScroll}>
                { ingredientGroups.map((group)=>(
                    <IngredientGroup key={group.type} data={group}>   
                        { getIngredientsFrom(group) }                 
                    </IngredientGroup>                                           
                    ))
                } 
            </section>    
            
            { showIngredientDetails && 
                <Modal type="ingredient" onClose={closeModal}> 
                    <IngredientDetails/>
                </Modal> 
            }           
        </article>
    );
}


export default BurgerIngredients;