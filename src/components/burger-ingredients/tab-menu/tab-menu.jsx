import React from 'react';
import {Tab}  from '@ya.praktikum/react-developer-burger-ui-components';
import {ingredientGroups} from '../../../utils/constants'


const TabMenu = () => {
    
    const [current, setCurrent] = React.useState('one')
    return (
        <div style={{ display: 'flex' }}>
            { ingredientGroups.map( ingredientGroup => (
                <Tab value={ingredientGroup.type} active={current === ingredientGroup.type} onClick={setCurrent}>
                    {ingredientGroup.name}
                </Tab>
                ))
            }
        </div>
    )
    
}

export default TabMenu;