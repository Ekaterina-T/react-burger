import {ActionTypes} from '../actionTypes';
import {cart} from './reducer';

describe('Action creators for cart', () => {

  it('should create an action with correct price', () => {

    const testAction = {type: ActionTypes.UPDATE_CART,
                        updatedCart: {bun: 'bun1', fillings: ['filling1', 'filling2']}};

    const expectedState = {
        createOrderInProgress: false,
        createOrderSuccess: false,
        createOrderFailed: false,
        showOrderDetails: false,
        orderDetails: null,

        bun: 'bun1',
        fillings: ['filling1', 'filling2']
    };

    expect(cart(undefined, testAction)).toEqual(expectedState);
  });

  it('should clear cart', () => {
    const testAction = {type: ActionTypes.CLEAR_CART};
    
    const initialState = {
        createOrderInProgress: false,
        createOrderSuccess: false,
        createOrderFailed: false,
        showOrderDetails: false,
        orderDetails: null,

        bun: 'bun1',
        fillings: ['filling1', 'filling2']
    };

    const expectedState = {
        createOrderInProgress: false,
        createOrderSuccess: false,
        createOrderFailed: false,
        showOrderDetails: false,
        orderDetails: null,

        bun: null,
        fillings: []
    };

    expect(cart(initialState, testAction)).toEqual(expectedState);
  });
  
  it('should run order request', () => {
    const testAction = {type: ActionTypes.CREATE_NEW_ORDER_REQUEST};
    
    const initialState = {
        createOrderInProgress: false,
        createOrderSuccess: false,
        createOrderFailed: false,
        showOrderDetails: false,
        orderDetails: null,

        bun: null,
        fillings: []
    };

    const expectedState = {
        createOrderInProgress: true,
        createOrderSuccess: false,
        createOrderFailed: false,
        showOrderDetails: false,
        orderDetails: null,

        bun: null,
        fillings: []
    };

    expect(cart(initialState, testAction)).toEqual(expectedState);
  });

  it('should handle successful order request', () => {
    const testAction = {type: ActionTypes.CREATE_NEW_ORDER_SUCCESS, 
                        orderDetails: {
                            "name": "Краторный метеоритный бургер",
                            "order": {
                                "number": 6257
                            },
                            "success": true
                          } 
                        };
    
    const initialState = {
        createOrderInProgress: true,
        createOrderSuccess: false,
        createOrderFailed: false,
        showOrderDetails: false,
        orderDetails: null,

        bun: null,
        fillings: []
    };

    const expectedState = {
        createOrderInProgress: false,
        createOrderSuccess: true,
        createOrderFailed: false,
        showOrderDetails: true,
        orderDetails: {
            "name": "Краторный метеоритный бургер",
            "order": {
                "number": 6257
            },
            "success": true
        },

        bun: null,
        fillings: []
    };

    expect(cart(initialState, testAction)).toEqual(expectedState);
  });
  
  it('should handle fails order request', () => {
    const testAction = {type: ActionTypes.CREATE_NEW_ORDER_FAILED};
    
    const initialState = {
        createOrderInProgress: true,
        createOrderSuccess: false,
        createOrderFailed: false,
        showOrderDetails: false,
        orderDetails: null,

        bun: null,
        fillings: []
    };

    const expectedState = {
        createOrderInProgress: false,
        createOrderSuccess: false,
        createOrderFailed: true,
        showOrderDetails: false,
        orderDetails: null,

        bun: null,
        fillings: []
    };

    expect(cart(initialState, testAction)).toEqual(expectedState);
  });

  it('should handle closing of order', () => {
    const testAction = {type: ActionTypes.CLOSE_ORDER};
    
    const initialState = {
        createOrderInProgress: false,
        createOrderSuccess: true,
        createOrderFailed: false,
        showOrderDetails: true,
        orderDetails: {
            "name": "Краторный метеоритный бургер",
            "order": {
                "number": 6257
            },
            "success": true
          } ,

        bun: null,
        fillings: []
    };

    const expectedState = {
        createOrderInProgress: false,
        createOrderSuccess: false,
        createOrderFailed: false,
        showOrderDetails: false,
        orderDetails: null,

        bun: null,
        fillings: []
    };

    expect(cart(initialState, testAction)).toEqual(expectedState);
  });

}) 