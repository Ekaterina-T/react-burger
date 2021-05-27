import React from 'react';
import styles from './burger-ingredients.module.css';
import IngredientGroup from './ingredient-group/ingredient-group';
import Ingredient from './ingredient/ingredient';
import TabMenu from './tab-menu/tab-menu';
import {ingredients, ingredientGroups} from '../../utils/data';
import PropTypes from 'prop-types';
import {isImageLink} from '../../utils/prop-type-custom-checks';



class BurgerIngredients extends React.Component {
    
    /*constructor(props) {
        super(props);
    } */


    render() {

        const cart = this.props.cart; 

        return (
           <article className={styles.ingredients}>
               <header>
                   <h2 className={styles.title}>Соберите бургер</h2>
               </header> 

               <TabMenu />
                   
                <section className={styles.ingredient_groups}>
                    { ingredientGroups.map((group, index)=>(
    
                        <IngredientGroup key={group.type} data={group}>                        
                            { ingredients
                                .filter(ingredient => ingredient.type === group.type)
                                .map((ingredient)=>{

                                    const ingredinetIndexInCart = cart.findIndex( item => item._id === ingredient._id);
                                    ingredient.count = ingredinetIndexInCart < 0 ? 0 : cart[ingredinetIndexInCart].count;
                                    
                                    return (
                                        <Ingredient key={ingredient._id} data={ingredient} updateCart={this.props.addIngredientToCart} />
                                    )
                                })
                            }               
                        </IngredientGroup>                       
                        ))
                    } 
                </section>               
           </article>
        )
    }; 
}

BurgerIngredients.propTypes = {
    cart: PropTypes.arrayOf(PropTypes.shape({

        _id: PropTypes.string,
        name: PropTypes.string,
        type: PropTypes.oneOf(["bun","sauce","main"]),
        proteins: PropTypes.number,
        fat: PropTypes.number,
        carbohydrates: PropTypes.number,
        calories: PropTypes.number,
        price: PropTypes.number,
        image: isImageLink,
        image_mobile: isImageLink,
        image_large: isImageLink,
        __v: PropTypes.number
      })
    )
};

export default BurgerIngredients;