import React, {FC} from 'react';
import styles from './nav-list.module.css';
import NavItem from '../nav-item/nav-item';

import {TNavItem} from '../../../services/types/index';

interface INavListЗкщзы {
    data: Array<TNavItem>;
    type: "main" | "nested";
    setDefault: boolean;
}

const NavList: FC<INavListЗкщзы> = ({data, type}) => {

    return (            
        <ul className={ type === 'main' ? styles.main_nav : styles.nested_nav}> 
            { data && data.map( item => (
                <NavItem 
                key={item.id} 
                data={item} />
            ))}
        </ul>
    );
    
}


export default NavList;

