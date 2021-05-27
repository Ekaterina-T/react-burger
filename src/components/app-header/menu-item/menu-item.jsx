import React from 'react';
import styles from './menu-item.module.css';
import MenuUL from '../menu-ul/menu-ul';
import PropTypes from 'prop-types';

class MenuItem extends React.Component {

    constructor (props) {        
        super(props);

        this.state = {isActive: false};
    }


    render() {

        const {id, title, iconSec, iconPri, subitems, href} = {...this.props.data};
        const hasSubItems = !!subitems;

        const isActive = this.state.isActive;
        const isNotActive = !isActive;

        return (            
            <li id={id} className={styles.menu_item}>                
                <a href={href} className={isActive ? styles.menu_link_active : styles.menu_link} >
                    {isNotActive && iconSec}
                    {isActive && iconPri}
                    {this.props.children}
                    <span className={styles.link_text}>{title}</span>
                </a> 
                { hasSubItems && <MenuUL data = {subitems} type="nested" setDefault={false}/>}
            </li>
        );
    } 
}

MenuItem.propTypes = {
    data: PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        subitems: PropTypes.arrayOf(PropTypes.object)
        }
    )
};

export default MenuItem;