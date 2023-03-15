import { ActionTypes } from '../actionTypes';
import { ingredients, TIngredientState } from './reducer';

import { IGetIngredientsSuccess, ISetActiveIngredient } from './actions';

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
    const testAction: IGetIngredientsSuccess = {
      type: ActionTypes.GET_INGREDIENTS_SUCCESS,
      data: [{
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
      },
      ],
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
      },
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

    const initialState: TIngredientState = {
      ingredientsLoad: false,
      ingredientsLoadSuccess: true,
      ingredientsLoadFailed: false,
      items: [{
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
      },
      ],

      showIngredientDetails: false,
      activeIngredient: {
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
      },
    };

    const expectedState = {
      ingredientsLoad: false,
      ingredientsLoadSuccess: true,
      ingredientsLoadFailed: false,
      items: [{
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
      },
      ],

      showIngredientDetails: true,
      activeIngredient: {
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
      },
    };

    expect(ingredients(initialState, testAction)).toEqual(expectedState);
  });

  it('should set active ingredient', () => {
    const testAction: ISetActiveIngredient = {
      type: ActionTypes.SET_ACTIVE_INGREDIENT,
      value: {
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
      },
    };

    const initialState: TIngredientState = {
      ingredientsLoad: false,
      ingredientsLoadSuccess: true,
      ingredientsLoadFailed: false,
      items: [{
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
      },
      ],

      showIngredientDetails: false,
      activeIngredient: {
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
    };

    const expectedState = {
      ingredientsLoad: false,
      ingredientsLoadSuccess: true,
      ingredientsLoadFailed: false,
      items: [{
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
      },
      ],

      showIngredientDetails: false,
      activeIngredient: {
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
      },
    };

    expect(ingredients(initialState, testAction)).toEqual(expectedState);
  });
});
