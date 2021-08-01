import React, {FC} from 'react';
import styles from './ingredient-group.module.css';

import { TIngredientGroup } from '../../../services/types/index';

interface IIngredientGroupProps {
    data: TIngredientGroup
}

const IngredientGroup: FC<IIngredientGroupProps> = (props) => {
    
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

export default IngredientGroup;