import React from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { ingredientGroups } from '../../../utils/constants';

interface ITabMenu {
  burgerIngredientsEl: { current: HTMLElement | null } ;
  currentTab: 'bun' | 'sauce' | 'main';
  updateCurrentTab: (tabValue:'bun' | 'sauce' | 'main') => any;
}

function TabMenu({ burgerIngredientsEl, currentTab, updateCurrentTab }: ITabMenu) {
  const scrollIntoSection = (tabValue: string) => {
    const section = burgerIngredientsEl.current && burgerIngredientsEl.current.querySelector(`section[id=${tabValue}]`);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      updateCurrentTab(tabValue as 'bun' | 'sauce' | 'main');
    }
  };

  return (
    <div style={{ display: 'flex' }}>
      { ingredientGroups.map((ingredientGroup) => (
        <Tab
          key={ingredientGroup.type}
          value={ingredientGroup.type}
          active={currentTab === ingredientGroup.type}
          onClick={scrollIntoSection}
        >
          {ingredientGroup.name}
        </Tab>
      ))}
    </div>
  );
}

export default TabMenu;
