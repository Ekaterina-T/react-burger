import React from 'react';
import styles from './ingredient-group.module.css';
import PropTypes from 'prop-types';


class IngredientGroup extends React.Component {

    render() {

        const {type, name} = {...this.props.data};

        return ( 
            <section key={type} className={styles.group}>
    
                <header>
                    <h3 className={styles.title}>{name}</h3>
                </header>
    
                <ul className={styles.ingredients}>
                    {this.props.children}
                </ul>    
                  
            </section>                       
        );

    } 
}


IngredientGroup.propTypes = {
    data: PropTypes.shape({
        name: PropTypes.string.isRequired,
        type: PropTypes.oneOf(["bun","sauce","main"]).isRequired
        }
    ),
    
};

export default IngredientGroup;