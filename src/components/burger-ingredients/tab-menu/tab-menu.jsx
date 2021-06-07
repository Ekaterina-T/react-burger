import React from 'react';
import {Tab}  from '@ya.praktikum/react-developer-burger-ui-components';
import {ingredientGroups} from '../../../utils/constants'


const TabMenu = (props) => {
    
    const [current, setCurrent] = React.useState('bun');

    const scrollIntoSection = (tabValue) => {
        setCurrent(tabValue);
        burgerIngredientsEl.current.querySelector(`section[id=${tabValue}]`).scrollIntoView({ behavior: "smooth" });
    };
    
    const {burgerIngredientsEl} = props;

    return (
        <div style={{ display: 'flex' }}>
            { ingredientGroups.map( ingredientGroup => (
                <Tab key={ingredientGroup.type} value={ingredientGroup.type} active={current === ingredientGroup.type} onClick={scrollIntoSection}>
                    {ingredientGroup.name}
                </Tab>
                ))
            }
        </div>
    )
    
}

export default TabMenu;