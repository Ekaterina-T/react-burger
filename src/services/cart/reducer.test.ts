import { ActionTypes } from '../actionTypes';
import { cart } from './reducer';
import { IUpdateCart } from './actions';

describe('Action creators for cart', () => {
  it('should create an action with correct price', () => {
    const testAction: IUpdateCart = {
      type: ActionTypes.UPDATE_CART,
      updatedCart: {
        bun: {
          key: '60666c42cc7b410027a1a9b1',
          _id: '60666c42cc7b410027a1a9b1',
          name: 'Краторная булка N-200i',
          type: 'bun',
          proteins: 80,
          fat: 24,
          carbohydrates: 53,
          calories: 420,
          price: 1255,
          image: 'https://code.s3.yandex.net/react/code/bun-02.png',
          image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
          image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
          __v: 0,
        },
        fillings: [{
          key: '60666c42cc7b410027a1a9b6',
          _id: '60666c42cc7b410027a1a9b6',
          name: 'Биокотлета из марсианской Магнолии',
          type: 'main',
          proteins: 420,
          fat: 142,
          carbohydrates: 242,
          calories: 4242,
          price: 424,
          image: 'https://code.s3.yandex.net/react/code/meat-01.png',
          image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
          image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
          __v: 0,
        },
        {
          key: '60666c42cc7b410027a1a9b7',
          _id: '60666c42cc7b410027a1a9b7',
          name: 'Соус Spicy-X',
          type: 'sauce',
          proteins: 30,
          fat: 20,
          carbohydrates: 40,
          calories: 30,
          price: 90,
          image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
          image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
          image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png',
          __v: 0,
        }],
      },
    };

    const expectedState = {
      createOrderInProgress: false,
      createOrderSuccess: false,
      createOrderFailed: false,
      showOrderDetails: false,
      orderDetails: null,

      bun: {
        key: '60666c42cc7b410027a1a9b1',
        _id: '60666c42cc7b410027a1a9b1',
        name: 'Краторная булка N-200i',
        type: 'bun',
        proteins: 80,
        fat: 24,
        carbohydrates: 53,
        calories: 420,
        price: 1255,
        image: 'https://code.s3.yandex.net/react/code/bun-02.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
        __v: 0,
      },
      fillings: [{
        key: '60666c42cc7b410027a1a9b6',
        _id: '60666c42cc7b410027a1a9b6',
        name: 'Биокотлета из марсианской Магнолии',
        type: 'main',
        proteins: 420,
        fat: 142,
        carbohydrates: 242,
        calories: 4242,
        price: 424,
        image: 'https://code.s3.yandex.net/react/code/meat-01.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
        __v: 0,
      },
      {
        key: '60666c42cc7b410027a1a9b7',
        _id: '60666c42cc7b410027a1a9b7',
        name: 'Соус Spicy-X',
        type: 'sauce',
        proteins: 30,
        fat: 20,
        carbohydrates: 40,
        calories: 30,
        price: 90,
        image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png',
        __v: 0,
      }],
    };

    expect(cart(undefined, testAction)).toEqual(expectedState);
  });

  it('should run order request', () => {
    const testAction = { type: ActionTypes.CREATE_NEW_ORDER_REQUEST };

    const initialState = {
      createOrderInProgress: false,
      createOrderSuccess: false,
      createOrderFailed: false,
      showOrderDetails: false,
      orderDetails: null,

      bun: null,
      fillings: [],
    };

    const expectedState = {
      createOrderInProgress: true,
      createOrderSuccess: false,
      createOrderFailed: false,
      showOrderDetails: false,
      orderDetails: null,

      bun: null,
      fillings: [],
    };

    expect(cart(initialState, testAction)).toEqual(expectedState);
  });

  it('should handle successful order request', () => {
    const testAction = {
      type: ActionTypes.CREATE_NEW_ORDER_SUCCESS,
      orderDetails: {
        name: 'Краторный метеоритный бургер',
        order: {
          number: 6257,
        },
        success: true,
      },
    };

    const initialState = {
      createOrderInProgress: true,
      createOrderSuccess: false,
      createOrderFailed: false,
      showOrderDetails: false,
      orderDetails: null,

      bun: null,
      fillings: [],
    };

    const expectedState = {
      createOrderInProgress: false,
      createOrderSuccess: true,
      createOrderFailed: false,
      showOrderDetails: true,
      orderDetails: {
        name: 'Краторный метеоритный бургер',
        order: {
          number: 6257,
        },
        success: true,
      },

      bun: null,
      fillings: [],
    };

    expect(cart(initialState, testAction)).toEqual(expectedState);
  });

  it('should handle fails order request', () => {
    const testAction = { type: ActionTypes.CREATE_NEW_ORDER_FAILED };

    const initialState = {
      createOrderInProgress: true,
      createOrderSuccess: false,
      createOrderFailed: false,
      showOrderDetails: false,
      orderDetails: null,

      bun: null,
      fillings: [],
    };

    const expectedState = {
      createOrderInProgress: false,
      createOrderSuccess: false,
      createOrderFailed: true,
      showOrderDetails: false,
      orderDetails: null,

      bun: null,
      fillings: [],
    };

    expect(cart(initialState, testAction)).toEqual(expectedState);
  });

  it('should handle closing of order', () => {
    const testAction = { type: ActionTypes.CLOSE_ORDER };

    const initialState = {
      createOrderInProgress: false,
      createOrderSuccess: true,
      createOrderFailed: false,
      showOrderDetails: true,
      orderDetails: {
        name: 'Краторный метеоритный бургер',
        order: {
          number: 6257,
        },
        success: true,
      },

      bun: null,
      fillings: [],
    };

    const expectedState = {
      createOrderInProgress: false,
      createOrderSuccess: false,
      createOrderFailed: false,
      showOrderDetails: false,
      orderDetails: null,

      bun: null,
      fillings: [],
    };

    expect(cart(initialState, testAction)).toEqual(expectedState);
  });
});
