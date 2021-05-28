import React from 'react';
import styles from './nav-item.module.css';
import NavList from '../nav-list/nav-list';
import PropTypes from 'prop-types';

class NavItem extends React.Component {

    render() {
   
        const {id, title, icon, subitems, href} = {...this.props.data};
        const hasSubItems = !!subitems;

        return (            
            <li className={ id==='profile' ? styles.profile_item : (id==='logo_desktop' ? styles.logo_desktop_item: styles.nav_item )}>                
                <a href={href} className={styles.nav_link} >
                    {icon}
                    {this.props.children}
                    <span className={styles.link_text}>{title}</span>
                </a> 
                { hasSubItems && <NavList data = {subitems} type="nested" setDefault={false}/>}
            </li>
        );
    } 
}

NavItem.propTypes = {
    data: PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        subitems: PropTypes.arrayOf(PropTypes.object)
        }
    )
};

export default NavItem;