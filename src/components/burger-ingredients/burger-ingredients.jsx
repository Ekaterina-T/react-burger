import React from 'react';
import styles from './burger-ingredients.module.css';
import IngredientGroup from './ingredient-group/ingredient-group';
import Ingredient from './ingredient/ingredient';
import TabMenu from './tab-menu/tab-menu';
//import {ingredients} from '../../utils/data';
import {ingredientGroups} from '../../utils/constants';
import PropTypes from 'prop-types';
import {isIngredientDescriptorFull} from '../../utils/prop-type-custom-checks';

const BurgerIngredients = (props) => {

    const burgerIngredientsEl = React.useRef(null);

    const {bun, fillings, addIngredientToCart} = props; 
    const ingredients = props.rowData;

    const cart = [...fillings, bun];

    return (
        <article className={styles.ingredients} ref={burgerIngredientsEl}>
            <header>
                <h2 className={styles.title}>Соберите бургер</h2>
            </header> 

            <TabMenu burgerIngredientsEl={burgerIngredientsEl}/>
                
            <section className={styles.ingredient_groups}>
                { ingredientGroups.map((group)=>(

                    <IngredientGroup key={group.type} data={group}>                        
                        { ingredients
                            .filter(ingredient => ingredient.type === group.type)
                            .map((ingredient)=>{

                                ingredient.count = cart.filter( item => item && item._id === ingredient._id).length;
                                
                                return (
                                    <Ingredient key={ingredient._id} data={ingredient} updateCart={addIngredientToCart} />
                                )
                            })
                        }               
                    </IngredientGroup>                       
                    ))
                } 
            </section>               
        </article>
    );
}

BurgerIngredients.propTypes = {
    bun: PropTypes.shape(isIngredientDescriptorFull),
    fillings: PropTypes.arrayOf(PropTypes.shape(isIngredientDescriptorFull)),
    addIngredientToCart: PropTypes.func.isRequired
};

export default BurgerIngredients;