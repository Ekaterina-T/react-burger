import {dataUrl, orderUrl} from '../utils/constants';

export const GET_INGREDIENTS = 'GET_INGREDIENTS';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';
export const SET_ACTIVE_INGREDIENT = 'SET_ACTIVE_INGREDIENT';
export const SHOW_INGREDIENT_DETAILS = 'SHOW_INGREDIENT_DETAILS';

export const UPDATE_CART = 'UPDATE_CART';

export const CREATE_NEW_ORDER = 'CREATE_NEW_ORDER';
export const CREATE_NEW_ORDER_SUCCESS = 'CREATE_NEW_ORDER_SUCCESS';
export const CREATE_NEW_ORDER_FAILED = 'CREATE_NEW_ORDER_FAILED';
export const SHOW_ORDER_DETAILS = 'SHOW_ORDER_DETAILS';

export const SORT_FILLINGS_ORDER = 'SORT_FILLINGS_ORDER';


export const getIngredientData = () => {

    return dispatch => {

        dispatch({type: GET_INGREDIENTS});

        fetch(dataUrl)
        .then(res => res.ok ? res.json() : Promise.reject(res.statusText))
        .then(res => {
            dispatch({type: GET_INGREDIENTS_SUCCESS, data: res.data});
        })
        .catch( e => {
            dispatch({type: GET_INGREDIENTS_FAILED});     
        });

    }
};

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
        const newIngredient = {...getState().ingredients.filter( item => item._id === ingredientID )[0]};

        assignKeyToIngredient(newIngredient);

        const updatedCart = (newIngredient.type === "bun") 
        ? {...prevCart, bun: newIngredient} 
        : {...prevCart, fillings: [...prevCart.fillings, newIngredient] }; 
               
        dispatch({type: UPDATE_CART, updatedCart: updatedCart});
    }
};

export const removeIngredientFromCart = (ingredientKey) => {

    return (dispatch, getState) => {

        const prevCart = getState().cart;
        const removedIngredientIndex = prevCart.fillings.findIndex((item) => item.key === ingredientKey);
        const updatedFillings = [...prevCart.fillings];

        updatedFillings.splice(removedIngredientIndex, 1);

        dispatch({type: UPDATE_CART, updatedCart: {...prevCart, fillings: updatedFillings}});
    }
};

export const createOrder = () => {
    
    return (dispatch, getState) => {

        dispatch({type: CREATE_NEW_ORDER});

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
            dispatch({type: CREATE_NEW_ORDER_SUCCESS, orderDetails: res});
            dispatch({type: SHOW_ORDER_DETAILS, value: true});
        })
        .catch( 
            dispatch({type: CREATE_NEW_ORDER_FAILED})
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
               
        dispatch({type: UPDATE_CART, updatedCart: updatedCart});
    }
}
