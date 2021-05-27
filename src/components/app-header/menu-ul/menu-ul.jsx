import React from 'react';
import styles from './menu-ul.module.css';
import MenuItem from '../menu-item/menu-item';
import PropTypes from 'prop-types';

class MenuUL extends React.Component {

    constructor (props) {        
        super(props);

        this.state = {
            activeItem: null,
        }
    }

    render() {

        const {data, type} = { ...this.props};

        return (            
            <ul className={ type === 'main' ? styles.menu_main : styles.menu_nested}> 
                { data.map( item => (
                    <MenuItem 
                    key={item.id} 
                    data={item} />
                ))}
            </ul>
        );
    } 
}

MenuUL.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object),
    type: PropTypes.oneOf(["main", "nested"]).isRequired
};

export default MenuUL;

