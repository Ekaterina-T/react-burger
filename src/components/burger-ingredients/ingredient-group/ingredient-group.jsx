import React from 'react';
import styles from './ingredient-group.module.css';
import PropTypes from 'prop-types';


const IngredientGroup = (props) => {

    const {type, name} = props.data;

    return ( 
        <section id={type} key={type} className={styles.group}>

            <header>
                <h3 className={styles.title}>{name}</h3>
            </header>

            <ul className={styles.ingredients}>
                {props.children}
            </ul>    
                
        </section>                       
    );
}


IngredientGroup.propTypes = {
    data: PropTypes.shape({
        name: PropTypes.string.isRequired,
        type: PropTypes.oneOf(["bun","sauce","main"]).isRequired
        }).isRequired,
    
};

export default IngredientGroup;