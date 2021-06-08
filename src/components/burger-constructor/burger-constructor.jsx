import React from 'react';
import styles from './burger-constructor.module.css';
import {ConstructorElement, DragIcon}  from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerConstructorTotal  from './burger-constructor-total/burger-constructor-total';

import {IngredientsContext} from '../../services/ingredients-context';


const BurgerConstructor = () => {

    const {cart: {bun, fillings}, removeIngredientFromCart} = React.useContext(IngredientsContext);
    
    const calcTotal = (bun, fillings) => {

        let result  = 0;

        if(!!bun) {
            result += 2*bun.price;
        }

        if(fillings.length > 0) {
            result += fillings.reduce((acc, filling) => acc + filling.price, 0);
        }

        return result;
    }

    let total = React.useMemo( 
            () => { return calcTotal(bun, fillings); },
            [bun, fillings]
        );

    const fillingsItems = fillings
                            .map( filling => (
                                <div key = {filling.key} className={styles.burgerIngredient}>
                                    <div className={styles.dragIcon}><DragIcon type="primary" /></div>
                                    <ConstructorElement
                                    isLocked={false}
                                    text={filling.name}
                                    price={filling.price}
                                    thumbnail={filling.image}
                                    handleClose={removeIngredientFromCart(filling.key)}/>
                                </div>
                            ));
    

    return (        
        <article className={styles.constructor}>
            { total>0 
                ? (<>
                    <div className = {styles.main_area}>

                        { bun != null && 
                        <ConstructorElement type="top" isLocked={true} text={bun.name} price={bun.price} thumbnail={bun.image} /> 
                        }

                        <div className={styles.scrollable_area}> {fillingsItems} </div>

                        { bun != null &&
                        <ConstructorElement type="bottom" isLocked={true} text={bun.name} price={bun.price} thumbnail={bun.image} />
                        }

                    </div>
                    <BurgerConstructorTotal total={total}/>
                </>)
                : <p className={styles.emptyConstructor}>Добавьте сюда ингредиенты</p>
            }                            
        </article>        
    ); 
}

export default BurgerConstructor;