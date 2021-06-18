import {orderUrl} from '../../utils/constants';
import {ActionTypes} from '../actionTypes';

export const addIngredientToCart = (ingredientID) => {

    return (dispatch, getState) => {

        const getIngredientKey = (ingredients) => {

            const maxAvailableIndex = ingredients.reduce( (res, item) => { 
                const currentKey = Number(item.key.split('_')[1]);
                return res < currentKey ? currentKey : res;
            },
            -1);  
            
            return maxAvailableIndex+1;
        }

        const assignKeyToIngredient = (ingredient) => {
            if(ingredient.type === "bun") {
                ingredient.key = ingredient._id;
                return;
            }
            ingredient.key = [ingredient._id, getIngredientKey(prevCart.fillings)].join('_');
        }
        
        const prevCart = getState().cart;
        const newIngredient = {...getState().ingredients.items.filter( item => item._id === ingredientID )[0]};

        assignKeyToIngredient(newIngredient);

        const updatedCart = (newIngredient.type === "bun") 
        ? {...prevCart, bun: newIngredient} 
        : {...prevCart, fillings: [...prevCart.fillings, newIngredient] }; 
               
        dispatch({type:  ActionTypes.UPDATE_CART, updatedCart: updatedCart});
    }
};

export const removeIngredientFromCart = (ingredientKey) => {

    return (dispatch, getState) => {

        const prevCart = getState().cart;
        const removedIngredientIndex = prevCart.fillings.findIndex((item) => item.key === ingredientKey);
        const updatedFillings = [...prevCart.fillings];

        updatedFillings.splice(removedIngredientIndex, 1);

        dispatch({type:  ActionTypes.UPDATE_CART, updatedCart: {...prevCart, fillings: updatedFillings}});
    }
};

export const createOrder = () => {
    
    return (dispatch, getState) => {

        dispatch({type:  ActionTypes.CREATE_NEW_ORDER_REQUEST});

        const prevCart = getState().cart;
        const {bun, fillings} = {...prevCart};

        fetch(orderUrl, {
            method: "POST", 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({"ingredients": [...fillings, bun].map( item => item._id)})
        })
        .then(res => res.ok ? res.json() : Promise.reject(res))
        .then(res => {
            //always create new order
            dispatch({type:  ActionTypes.CREATE_NEW_ORDER_SUCCESS, orderDetails: res});
            dispatch({type:  ActionTypes.SHOW_ORDER_DETAILS, value: true});
        })
        .catch( 
            dispatch({type:  ActionTypes.CREATE_NEW_ORDER_FAILED})
        );
    }  
};

export const sortFillingsOrder = (oldItemIndex, newItemIndex) => {
    return (dispatch, getState) => {

        const prevCart = getState().cart;
        const newFillings = [...prevCart.fillings];
        
        const itemToMove = newFillings[oldItemIndex];
        newFillings.splice(oldItemIndex,1);
        newFillings.splice(newItemIndex, 0, itemToMove);

        const updatedCart = {...prevCart, fillings: newFillings }; 
               
        dispatch({type:  ActionTypes.UPDATE_CART, updatedCart: updatedCart});
    }
}
