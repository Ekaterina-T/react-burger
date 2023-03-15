/* eslint-disable no-underscore-dangle */
import React from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';

import styles from './burger-ingredients.module.css';

import IngredientGroup from './ingredient-group/ingredient-group';
import Ingredient from './ingredient/ingredient';
import TabMenu from './tab-menu/tab-menu';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';

import { ingredientGroups } from '../../utils/constants';

import { ActionTypes } from '../../services/actionTypes';

import {
  useAppDispatch, useAppSelector, TIngredient, TIngredientGroup,
} from '../../services/types';

function BurgerIngredients() {
  const location = useLocation();
  const history = useHistory();

  const [currentTab, setCurrentTab] = React.useState<'bun' | 'sauce' | 'main'>('bun');

  const dispatch = useAppDispatch();
  const { items, showIngredientDetails } = useAppSelector((store) => store.ingredients);

  const burgerIngredientsEl = React.useRef<HTMLElement>(null);

  const openModal = (ingredient: TIngredient) => {
    dispatch({ type: ActionTypes.SET_ACTIVE_INGREDIENT, value: ingredient });
    dispatch({ type: ActionTypes.SHOW_INGREDIENT_DETAILS, value: true });
  };

  const closeModal = (e: React.MouseEvent | React.KeyboardEvent) => {
    e.stopPropagation();
    dispatch({ type: ActionTypes.SHOW_INGREDIENT_DETAILS, value: false });
    dispatch({ type: ActionTypes.SET_ACTIVE_INGREDIENT, value: null });
    history.goBack();
  };

  const getIngredientsFrom = (group: TIngredientGroup) => (
    items
      .filter((ingredient) => ingredient.type === group.type)
      .map((ingredient) => (
        <Link key={ingredient._id} to={{ pathname: `/ingredients/${ingredient._id}`, state: { background: location } }}>
          <Ingredient
            data={ingredient}
            openModal={openModal}
          />
        </Link>
      ))
  );

  const updateActiveTabOnScroll = (e: React.UIEvent) => {
    if (!e.target) {
      return;
    }

    const scrollableArea = e.target as Element;
    const scrollableAreaTop = scrollableArea.getBoundingClientRect().y;
    const scrollableIngredientGroups = Array.prototype.slice.call(scrollableArea.querySelectorAll('section'));

    const isClosestHeaderVisible = (
      section: Element,
      sectionIndex: number,
      allSections: Array<object>,
    ) => {
      if (sectionIndex === allSections.length - 1) { // last section is active
        return true;
      }

      const sectionRect = section.querySelector('ul')!.getBoundingClientRect();
      return sectionRect.y >= scrollableAreaTop;
    };

    const visibleGroup = scrollableIngredientGroups.find(isClosestHeaderVisible);

    setCurrentTab(visibleGroup.getAttribute('id'));
  };

  return (
    <article className={styles.ingredients}>
      <header>
        <h2 className={styles.title}>Соберите бургер</h2>
      </header>

      <TabMenu
        burgerIngredientsEl={burgerIngredientsEl}
        currentTab={currentTab}
        updateCurrentTab={setCurrentTab}
      />

      <section
        className={styles.ingredient_groups}
        ref={burgerIngredientsEl}
        onScroll={updateActiveTabOnScroll}
      >
        { ingredientGroups.map((group) => (
          <IngredientGroup key={group.type} data={group}>
            { getIngredientsFrom(group) }
          </IngredientGroup>
        ))}
      </section>

      { showIngredientDetails
                && (
                <Modal type="ingredient" onClose={closeModal}>
                  <IngredientDetails />
                </Modal>
                )}
    </article>
  );
}

export default BurgerIngredients;
