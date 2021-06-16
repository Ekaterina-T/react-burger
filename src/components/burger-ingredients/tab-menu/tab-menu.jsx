import React from 'react';
import {Tab}  from '@ya.praktikum/react-developer-burger-ui-components';
import {ingredientGroups} from '../../../utils/constants'


const TabMenu = ({burgerIngredientsEl, currentTab, updateCurrentTab}) => {
    
    const scrollIntoSection = (tabValue) => {
        burgerIngredientsEl.current.querySelector(`section[id=${tabValue}]`).scrollIntoView({ behavior: "smooth" });
        updateCurrentTab(tabValue);
    };

    return (
        <div style={{ display: 'flex' }}>
            { ingredientGroups.map( ingredientGroup => (
                <Tab key={ingredientGroup.type} value={ingredientGroup.type} active={currentTab === ingredientGroup.type} onClick={scrollIntoSection}>
                    {ingredientGroup.name}
                </Tab>
                ))
            }
        </div>
    )
    
}

export default TabMenu;