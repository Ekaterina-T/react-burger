import React from 'react';
import styles from './nav-list.module.css';
import NavItem from '../nav-item/nav-item';
import PropTypes from 'prop-types';

class NavList extends React.Component {

    constructor (props) {        
        super(props);

        this.state = {
            activeItem: null,
        }
    }

    render() {

        const data = this.props.data;
        const type = this.props.type;

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
}

NavList.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object),
    type: PropTypes.oneOf(["main", "nested"]).isRequired
};

export default NavList;

