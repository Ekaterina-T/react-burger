import {ActionTypes} from '../actionTypes';

const initialState = {
    
    registerRequest: false,
    registerSuccess: false,
    registerFailed: false,

    loginRequest: false,
    loginSuccess: false,
    loginFailed: false,

    logoutRequest: false,
    logoutSuccess: false,
    logoutFailed: false,

    passwordResetRequest: false,
    passwordResetSuccess: false,
    passwordResetFailed: false
}

export const user = (state = initialState, action) => {

    switch (action.type) {
            
        case ActionTypes.REGISTER_REQUEST: 
            return {
                ...state, 
                registerRequest: true
            };
    
        case ActionTypes.REGISTER_SUCCESS: 
            return {
                ...state, 
                registerRequest: false,
                registerSuccess: true,

                email: action.data.user.email,
                name: action.data.user.name,

                accessToken: action.data.accessToken,
                accessTokenTimeStamp: new Date(),
                refreshToken: action.data.refreshToken
            };

        case ActionTypes.REGISTER_FAILED: 
            return {
                ...state, 
                registerRequest: false,
                registerFailed: true
            };

            
        case ActionTypes.LOGIN_REQUEST: 
            return {
                ...state, 
                logoutSuccess: false,
                loginRequest: true
            };
    
        case ActionTypes.LOGIN_SUCCESS: 
            return {
                ...state, 
                loginRequest: false,
                loginSuccess: true,
            };

        case ActionTypes.LOGIN_FAILED:
            return {
                ...state, 
                loginRequest: false,
                loginFailed: true
            }; 

                
        case ActionTypes.LOGOUT_REQUEST: 
            return {
                ...state, 
                logoutRequest: true
            };

        case ActionTypes.LOGOUT_SUCCESS: 
            return {
                ...state, 
                logoutRequest: false,
                logoutSuccess: true,
                loginSuccess: false
            };

        case ActionTypes.LOGOUT_FAILED:
            return {
                ...state, 
                logoutRequest: false,
                logoutFailed: true
            }; 

           
        case ActionTypes.PASSWORD_RESET_REQUEST: 
            return {
                ...state, 
                passwordResetRequest: true
            };
        
        case ActionTypes.PASSWORD_RESET_SUCCESS: 
            return {
                ...state, 
                passwordResetRequest: false,
                passwordResetSuccess: true
            };

        case ActionTypes.PASSWORD_RESET_FAILED: 
            return {
                ...state, 
                passwordResetRequest: false,
                passwordResetFailed: true
            };
        
        default: return state;
    }
}