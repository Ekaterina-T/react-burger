/* eslint-disable import/no-cycle */
/* eslint-disable no-underscore-dangle */
import { TIngredient, TIngredientWithKey } from '../types';

class CartActions {
  static createNewIngredient(ingredients: TIngredient[], ingredientID: string): TIngredientWithKey {
    const newIngredient = {
      ...ingredients
        .filter((item: TIngredient) => item._id === ingredientID)[0],
    };

    newIngredient.key = CartActions.getIngredientKey(newIngredient);

    return newIngredient;
  }

  static getIngredientKey(ingredient: TIngredient): string {
    return ingredient.type === 'bun' ? ingredient._id : [ingredient._id, Date.now()].join('_');
  }
}

export default CartActions;
