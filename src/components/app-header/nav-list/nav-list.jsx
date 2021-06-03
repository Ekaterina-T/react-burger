import React from 'react';
import styles from './nav-list.module.css';
import NavItem from '../nav-item/nav-item';
import PropTypes from 'prop-types';

const NavList = (props) => {

    const {data, type} = props;

    return (            
        <ul className={ type === 'main' ? styles.main_nav : styles.nested_nav}> 
            { data.map( item => (
                <NavItem 
                key={item.id} 
                data={item} />
            ))}
        </ul>
    );
    
}

NavList.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    type: PropTypes.oneOf(["main", "nested"]).isRequired
};

export default NavList;

