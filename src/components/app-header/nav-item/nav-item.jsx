import React from 'react';
import {NavLink, } from 'react-router-dom';

import styles from './nav-item.module.css';
import NavList from '../nav-list/nav-list';
import PropTypes from 'prop-types';

const NavItem = (props) => {

    const  {id, title, icon, cssClass, subitems, to}= props.data;
    const hasSubItems = !!subitems;

    const isActive = (match) => {

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
            { hasSubItems && <NavList data = {subitems} type="nested" setDefault={false}/>}
        </li>
    );
     
}

NavItem.propTypes = {
    data: PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        subitems: PropTypes.arrayOf(PropTypes.object)
        }
    ).isRequired
};

export default NavItem;