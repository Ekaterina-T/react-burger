import React , {FC} from 'react';
import {NavLink } from 'react-router-dom';

import styles from './nav-item.module.css';
import NavList from '../nav-list/nav-list';
import {TNavItem} from '../../../services/types/index';

interface INavItem {
    data: TNavItem;
}

const NavItem: FC<INavItem> = (props) => {

    const  {id, title, icon, cssClass, subitems, to} = props.data;

    const isActive = (match: any) => {

        if (id === 'logo_desktop' || !match || !match.isExact) {
          return false;
        }

        return true;
    }

    return (            
        <li className={ !!cssClass ? styles[cssClass] : styles.nav_item}>  
            <NavLink 
            to={to || '/'} 
            isActive={isActive}
            className={styles.nav_link} 
            activeClassName="nav_link-active" >
                {icon}
                {props.children}
                <span className={styles.link_text}>{title}</span>
            </NavLink>
            { !!subitems && <NavList data = {subitems} type="nested" setDefault={false}/>}
        </li>
    );
     
}

export default NavItem;