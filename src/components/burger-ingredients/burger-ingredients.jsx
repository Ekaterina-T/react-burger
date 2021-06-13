import React from 'react';
import styles from './burger-ingredients.module.css';

import IngredientGroup from './ingredient-group/ingredient-group';
import Ingredient from './ingredient/ingredient';
import TabMenu from './tab-menu/tab-menu';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';

import {ingredientGroups} from '../../utils/constants';
import {IngredientsContext} from '../../services/ingredients-context';


const BurgerIngredients = () => {

    const [isModalVisible, setIsModalVisible] = React.useState(false);
    const [activeIngredient, setActiveIngredient] = React.useState(null);

    const {ingredients, cart: {bun, fillings}, addIngredientToCart} = React.useContext(IngredientsContext);

    const burgerIngredientsEl = React.useRef(null);  
    
    const openModal = (ingredient) => {
        setIsModalVisible(true);
        setActiveIngredient(ingredient);
    }

    const closeModal = (e) => {
        e.stopPropagation();
        setIsModalVisible(false);
        setActiveIngredient(null);
    }

    const getIngredientsFrom = (group) => (
        ingredients
        .filter(ingredient => ingredient.type === group.type)
        .map((ingredient) => {
            const ingredientCount = [...fillings, bun].filter( item => item && item._id === ingredient._id).length;
            return (
                    <Ingredient 
                    key={ingredient._id} 
                    data={ingredient} 
                    ingredientCount={ingredientCount}
                    updateCart={addIngredientToCart} 
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
            
            { isModalVisible && 
                <Modal key="ingredient" type="ingredient" onClose={closeModal}> 
                    <IngredientDetails data={activeIngredient}/>
                </Modal> 
            }           
        </article>
    );
}


export default BurgerIngredients;