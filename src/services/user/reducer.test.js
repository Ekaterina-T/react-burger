import {ActionTypes} from '../actionTypes';
import {user} from './reducer';

const state = {

    name: null,
    email: null,
    
    registerRequest: false,
    registerSuccess: false,
    registerFailed: false,

    loginRequest: false,
    loginSuccess: false,
    loginFailed: false,

    logoutRequest: false,
    logoutSuccess: false,
    logoutFailed: false,

    passwordResetCodeRequest: false,
    passwordResetCodeSuccess: false,
    passwordResetCodeFailed: false,

    passwordResetRequest: false,
    passwordResetSuccess: false,
    passwordResetFailed: false,
    refreshSuccess: false,

    accessToken: null,
    accessTokenTimeStamp: null,
    refreshToken: null
}

describe('Action creators for user', () => {

    it('should create register request', () => {

        const testAction = {type: ActionTypes.REGISTER_REQUEST};
        const expectedState = {...state, registerRequest: true };

        expect(user(undefined, testAction)).toEqual(expectedState);
    });

    it('should handle successful register request', () => {

        const testDate = new Date();

        const testAction = {type: ActionTypes.REGISTER_SUCCESS,
                            data: {accessToken: 'accessToken', refreshToken: 'refreshToken', timeStamp: testDate}
                           };
        const initialState = {...state, registerRequest: true };
        const expectedState = {...state, 
                                registerRequest: false, 
                                registerSuccess: true,
                                accessToken: 'accessToken',
                                accessTokenTimeStamp: testDate,
                                refreshToken: 'refreshToken'
                              }

        expect(user(initialState, testAction)).toEqual(expectedState);
    });

    it('should failed register request', () => {

        const testAction = {type: ActionTypes.REGISTER_FAILED };
        const initialState = {...state, registerRequest: true };
        const expectedState = {...state, registerRequest: false, registerFailed: true };

        expect(user(initialState, testAction)).toEqual(expectedState);
    });


    
    it('should create login request', () => {

        const testAction = {type: ActionTypes.LOGIN_REQUEST };
        const initialState = { ...state, logoutSuccess: true, refreshSuccess: true };
        const expectedState = { ...state, loginRequest: true, logoutSuccess: false, refreshSuccess: false };

        expect(user(initialState, testAction)).toEqual(expectedState);
    });

    it('should create login success', () => {

        const testAction = {type: ActionTypes.LOGIN_SUCCESS, user: { name: 'name', email: 'email'} };
        const initialState = { ...state, loginRequest: true };
        const expectedState = {
            ...state, 
            loginRequest: false,
            loginSuccess: true,

            name: 'name',
            email: 'email'
        }

        expect(user(initialState, testAction)).toEqual(expectedState);
    });

    it('should create login failed', () => {

        const testAction = {type: ActionTypes.LOGIN_FAILED};
        const initialState = { ...state, loginRequest: true };
        const expectedState = {
            ...state, 
            loginRequest: false,
            loginFailed: true
        }

        expect(user(initialState, testAction)).toEqual(expectedState);
    });

    
    
    it('should create logout request', () => {

        const testAction = {type: ActionTypes.LOGOUT_REQUEST };
        const initialState = { ...state, 
                                loginSuccess: true, 
                                refreshSuccess: true, 
                                name: 'name', 
                                email: 'email' 
                            };
        const expectedState = { ...initialState, logoutRequest: true };

        expect(user(initialState, testAction)).toEqual(expectedState);
    });

    it('should create logout success', () => {

        const testAction = {type: ActionTypes.LOGOUT_SUCCESS };
        const initialState = { ...state, 
                                loginSuccess: true, 
                                refreshSuccess: true, 
                                logoutRequest: true, 
                                name: 'name', 
                                email: 'email' 
                             };
        const expectedState = {
            ...state, 
            logoutRequest: false,
            logoutSuccess: true,
            loginSuccess: false,
            refreshSuccess: false, 
            name: null,
            email: null
        }

        expect(user(initialState, testAction)).toEqual(expectedState);
    });

    it('should create logout failed', () => {

        const testAction = {type: ActionTypes.LOGOUT_FAILED};
        const initialState = { ...state, logoutRequest: true };
        const expectedState = {
            ...initialState, 
            logoutRequest: false,
            logoutFailed: true
        }

        expect(user(initialState, testAction)).toEqual(expectedState);
    });

    
    
    it('should create password reset code request', () => {

        const testAction = {type: ActionTypes.PASSWORD_RESET_CODE_REQUEST };
        const initialState = { ...state};
        const expectedState = { ...initialState,
                                passwordResetCodeRequest: true 
                              };

        expect(user(initialState, testAction)).toEqual(expectedState);
    });

    it('should create password reset code success', () => {

        const testAction = {type: ActionTypes.PASSWORD_RESET_CODE_SUCCESS };
        const initialState = { ...state,
                                  passwordResetCodeRequest: true 
                             };

        const expectedState = {
            ...initialState, 
            passwordResetCodeRequest: false,
            passwordResetCodeSuccess: true
        }

        expect(user(initialState, testAction)).toEqual(expectedState);
    });

    it('should create password reset code failed', () => {

        const testAction = {type: ActionTypes.PASSWORD_RESET_CODE_FAILED};
        const initialState = {
            ...state, 
            passwordResetCodeRequest: false,
            passwordResetCodeSuccess: true
        };
        const expectedState = {
            ...initialState, 
            passwordResetCodeRequest: false,
            passwordResetCodeFailed: true
        }

        expect(user(initialState, testAction)).toEqual(expectedState);
    });   


    
    it('should create password reset request', () => {

        const testAction = {type: ActionTypes.PASSWORD_RESET_REQUEST };
        const initialState = { ...state};
        const expectedState = { ...initialState,
                                 passwordResetRequest: true
                              };

        expect(user(initialState, testAction)).toEqual(expectedState);
    });

    it('should create password reset success', () => {

        const testAction = {type: ActionTypes.PASSWORD_RESET_SUCCESS };
        const initialState = { ...state,
                                passwordResetRequest: true
                             };

        const expectedState = {
            ...initialState, 
            passwordResetRequest: false,
            passwordResetSuccess: true
        }

        expect(user(initialState, testAction)).toEqual(expectedState);
    });

    it('should create password reset failed', () => {

        const testAction = {type: ActionTypes.PASSWORD_RESET_FAILED};
        const initialState = {
            ...state, 
            passwordResetRequest: false,
            passwordResetSuccess: true
        };
        const expectedState = {
            ...initialState, 
            passwordResetRequest: false,
            passwordResetFailed: true,
            passwordResetCodeSuccess: false
        }

        expect(user(initialState, testAction)).toEqual(expectedState);
    });


    
    it('should refresh user\'s tokens', () => {

        const testAction = {type: ActionTypes.USER_REFRESH_SUCCESS, user: {name: 'name', email: 'email'}};
        const initialState = { ...state };
        const expectedState = {
            ...initialState, 
            loginRequest: false,
            loginSuccess: true,

            name: 'name',
            email: 'email'
        }

        expect(user(initialState, testAction)).toEqual(expectedState);
    });

});