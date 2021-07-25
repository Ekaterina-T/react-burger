import {ActionTypes} from '../actionTypes';
import {ingredients} from './reducer';

describe('Action creators for ingredients', () => {

  it('should set ingredients upload to in progress', () => {

    const testAction = { type: ActionTypes.GET_INGREDIENTS_REQUEST };

    const expectedState = {
        ingredientsLoad: true,
        ingredientsLoadSuccess: false,
        ingredientsLoadFailed: false,
        items: [],
    
        showIngredientDetails: false,
        activeIngredient: null,
    };

    expect(ingredients(undefined, testAction)).toEqual(expectedState);
  });

  it('should handle successful ingredients upload', () => {

    const testAction = { type: ActionTypes.GET_INGREDIENTS_SUCCESS, 
                         data: [{
                                    "_id":"60666c42cc7b410027a1a9b1",
                                    "name":"Краторная булка N-200i"
                                },
                                {
                                    "_id":"60666c42cc7b410027a1a9b5",
                                    "name":"Говяжий метеорит (отбивная)"
                                }
                                ]
                        };

    const initialState = {
        ingredientsLoad: true,
        ingredientsLoadSuccess: false,
        ingredientsLoadFailed: false,
        items: [],

        showIngredientDetails: false,
        activeIngredient: null,
    };   

    const expectedState = {
        ingredientsLoad: false,
        ingredientsLoadSuccess: true,
        ingredientsLoadFailed: false,
        items: [{
                    "_id":"60666c42cc7b410027a1a9b1",
                    "name":"Краторная булка N-200i"
                },
                {
                    "_id":"60666c42cc7b410027a1a9b5",
                    "name":"Говяжий метеорит (отбивная)"
                }
               ],
    
        showIngredientDetails: false,
        activeIngredient: null,
    };

    expect(ingredients(initialState, testAction)).toEqual(expectedState);
  });

  it('should handle failed ingredients upload', () => {

    const testAction = { type: ActionTypes.GET_INGREDIENTS_FAILED };

    const initialState = {
        ingredientsLoad: true,
        ingredientsLoadSuccess: false,
        ingredientsLoadFailed: false,
        items: [],

        showIngredientDetails: false,
        activeIngredient: null,
    };   

    const expectedState = {
        ingredientsLoad: false,
        ingredientsLoadSuccess: false,
        ingredientsLoadFailed: true,
        items: [],
    
        showIngredientDetails: false,
        activeIngredient: null,
    };

    expect(ingredients(initialState, testAction)).toEqual(expectedState);
  });

  it('should show ingredient details', () => {

    const testAction = { type: ActionTypes.SHOW_INGREDIENT_DETAILS, value: true };

    const initialState = {
        ingredientsLoad: false,
        ingredientsLoadSuccess: true,
        ingredientsLoadFailed: false,
        items: [{
                    "_id":"60666c42cc7b410027a1a9b1",
                    "name":"Краторная булка N-200i"
                },
                {
                    "_id":"60666c42cc7b410027a1a9b5",
                    "name":"Говяжий метеорит (отбивная)"
                }
               ],

        showIngredientDetails: false,
        activeIngredient: {
                            "_id":"60666c42cc7b410027a1a9b1",
                            "name":"Краторная булка N-200i"
                          }
    };   

    const expectedState = {
        ingredientsLoad: false,
        ingredientsLoadSuccess: true,
        ingredientsLoadFailed: false,
        items: [{
            "_id":"60666c42cc7b410027a1a9b1",
            "name":"Краторная булка N-200i"
        },
        {
            "_id":"60666c42cc7b410027a1a9b5",
            "name":"Говяжий метеорит (отбивная)"
        }
       ],
    
        showIngredientDetails: true,
        activeIngredient: {
            "_id":"60666c42cc7b410027a1a9b1",
            "name":"Краторная булка N-200i"
          },
    };

    expect(ingredients(initialState, testAction)).toEqual(expectedState);
  });

  it('should set active ingredient', () => {

    const testAction = { type: ActionTypes.SET_ACTIVE_INGREDIENT, 
                         value: {
                                    "_id":"60666c42cc7b410027a1a9b1",
                                    "name":"Краторная булка N-200i"
                                } 
                        };

    const initialState = {
        ingredientsLoad: false,
        ingredientsLoadSuccess: true,
        ingredientsLoadFailed: false,
        items: [{
                    "_id":"60666c42cc7b410027a1a9b1",
                    "name":"Краторная булка N-200i"
                },
                {
                    "_id":"60666c42cc7b410027a1a9b5",
                    "name":"Говяжий метеорит (отбивная)"
                }
               ],

        showIngredientDetails: false,
        activeIngredient: {
                            "_id":"60666c42cc7b410027a1a9b5",
                            "name":"Говяжий метеорит (отбивная)"
                          }
    };   

    const expectedState = {
        ingredientsLoad: false,
        ingredientsLoadSuccess: true,
        ingredientsLoadFailed: false,
        items: [{
            "_id":"60666c42cc7b410027a1a9b1",
            "name":"Краторная булка N-200i"
        },
        {
            "_id":"60666c42cc7b410027a1a9b5",
            "name":"Говяжий метеорит (отбивная)"
        }
       ],
    
        showIngredientDetails: false,
        activeIngredient: {
            "_id":"60666c42cc7b410027a1a9b1",
            "name":"Краторная булка N-200i"
        },
    };

    expect(ingredients(initialState, testAction)).toEqual(expectedState);
  });

}) 