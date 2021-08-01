import {authEndpoints, passwordResetUrl, resetUrl} from '../../utils/constants';
import {setCookie, deleteCookie} from '../../utils/cookie';

import {ActionTypes} from '../actionTypes';

import { accessTokenName,  refreshTokenName} from '../../utils/constants';
import { getProfileSettings, updateProfileSettings, refreshToken, setToken } from '../../utils/token';
import { AppThunk, AppDispatch } from '../types';


export interface IRegisterRequest {
    readonly type: typeof ActionTypes.REGISTER_REQUEST;
}
export interface IRegisterSuccess {
    readonly type: typeof ActionTypes.REGISTER_SUCCESS;
    readonly data: {[name : string]: string };
}
export interface IRegisterFailed {
    readonly type: typeof ActionTypes.REGISTER_FAILED;
}

export interface ILoginRequest {
    readonly type: typeof ActionTypes.LOGIN_REQUEST;
}
export interface ILoginSuccess {
    readonly type: typeof ActionTypes.LOGIN_SUCCESS;
    readonly user: {[name: string]: string};
}
export interface ILoginFailed {
    readonly type: typeof ActionTypes.LOGIN_FAILED;
}

export interface ILogoutRequest {
    readonly type: typeof ActionTypes.LOGOUT_REQUEST;
}
export interface ILogoutSuccess {
    readonly type: typeof ActionTypes.LOGOUT_SUCCESS;
}
export interface ILogoutFailed {
    readonly type: typeof ActionTypes.LOGOUT_FAILED;
}

export interface IPasswordResetCodeRequest {
    readonly type: typeof ActionTypes.PASSWORD_RESET_CODE_REQUEST;
}
export interface IPasswordResetCodeSuccess {
    readonly type: typeof ActionTypes.PASSWORD_RESET_CODE_SUCCESS;
}
export interface IPasswordResetCodeFailed {
    readonly type: typeof ActionTypes.PASSWORD_RESET_CODE_FAILED;
}

export interface IPasswordResetRequest {
    readonly type: typeof ActionTypes.PASSWORD_RESET_REQUEST;
}
export interface IPasswordResetSuccess {
    readonly type: typeof ActionTypes.PASSWORD_RESET_SUCCESS;
}
export interface IPasswordResetFailed {
    readonly type: typeof ActionTypes.PASSWORD_RESET_FAILED;
}

export interface IUserRefreshSuccess {
    readonly type: typeof ActionTypes.USER_REFRESH_SUCCESS;
    readonly user: {[name: string]: string};
}

export type TUserActions = | IRegisterRequest
| IRegisterSuccess
| IRegisterFailed
| ILoginRequest
| ILoginSuccess
| ILoginFailed
| ILogoutRequest
| ILogoutSuccess
| ILogoutFailed
| IPasswordResetCodeRequest
| IPasswordResetCodeSuccess
| IPasswordResetCodeFailed
| IPasswordResetRequest
| IPasswordResetSuccess
| IPasswordResetFailed
| IUserRefreshSuccess;

export const register = (email: string, password: string, name: string) => {

    return (dispatch: AppDispatch) => {

        dispatch({type: ActionTypes.REGISTER_REQUEST});

        fetch(authEndpoints.registerUrl, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "email": email, 
                "password": password, 
                "name": name 
            } )
        })
        .then(res => res.ok ? res.json() : Promise.reject(res))
        .then(res => {
            /*
                {
                    "success": true,
                    "user": {
                        "email": "",
                        "name": ""
                    },
                    "accessToken": "Bearer ...",
                    "refreshToken": ""
                } 
            */
           if(res.success) {
               setCookie(accessTokenName, res.accessToken, {expires: 20*60});
               window.localStorage.setItem(refreshTokenName, res.refreshToken);
               dispatch({type:  ActionTypes.REGISTER_SUCCESS, 
                         data: {...res, timeStamp: new Date()}
                        });
           } else {
               throw new Error('Registration failed');
           }
            
        })
        .catch( res => {
            //TODO: error handling
            console.log('Registration failed'+res);            
            dispatch({type:  ActionTypes.REGISTER_FAILED});
        });

    }
};

export const login: AppThunk = (email: string, password: string) => {

    return (dispatch: AppDispatch) => {

        dispatch({type: ActionTypes.LOGIN_REQUEST});

        fetch(authEndpoints.authUrl, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "email": email, 
                "password": password
            } )
        })
        .then(res => res.ok ? res.json() : Promise.reject(res))
        .then(res => {
            /*
                {
                    "success": true,
                    "accessToken": "Bearer ...",
                    "refreshToken": "",
                    "user": {
                        "email": "",
                        "name": ""
                    }
                } 
            */
           if(res.success) {
               setToken(res);
               dispatch({type:  ActionTypes.LOGIN_SUCCESS, user: res.user});
            } else {
               throw new Error('Login failed');
            }
        })
        .catch( res => {
            //TODO: error handling
            console.log('Login failed'+res);            
            dispatch({type:  ActionTypes.LOGIN_FAILED});
        })
        .catch( () => { console.log('LOGIN_FAILED') });

    }
};

export const logout: AppThunk = () => {

    return (dispatch: AppDispatch) => {

        dispatch({type: ActionTypes.LOGOUT_REQUEST});

        fetch(authEndpoints.logoutUrl, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "token": window.localStorage.getItem(refreshTokenName)
            } )
        })
        .then(res => res.ok ? res.json() : Promise.reject(res))
        .then((res) => {
            /*
                {
                    "success": true,
                    "message": "Successful logout"
                } 
            */
            if(res.success) { 
                deleteCookie(accessTokenName);
                window.localStorage.removeItem(refreshTokenName);
                dispatch({type:  ActionTypes.LOGOUT_SUCCESS});            
            } else {
                throw new Error('Logout failed');
            }      
        })
        .catch( res => {
            //TODO: error handling
            console.log('Logout failed'+res);     
            dispatch({type:  ActionTypes.LOGOUT_FAILED});
        });

    }
};

export const requestPasswordResetCode: AppThunk = (email: string) => {

    return (dispatch: AppDispatch) => {

        dispatch({type: ActionTypes.PASSWORD_RESET_CODE_REQUEST});

        fetch(passwordResetUrl, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({"email": email})
        })
        .then(res => res.ok ? res.json() : Promise.reject(res))
        .then(res => {
            if(res.success) {
                dispatch({type:  ActionTypes.PASSWORD_RESET_CODE_SUCCESS});
            } else {
                throw new Error('requestPasswordResetCode failed');
            }            
        })
        .catch( res => {
            console.log('requestPasswordResetCode failed '+res);
            dispatch({type:  ActionTypes.PASSWORD_RESET_CODE_FAILED});
        });

    }


};

export const resetPassword: AppThunk = (password: string, verificationToken: string) => {

    return (dispatch: AppDispatch) => {

        dispatch({type: ActionTypes.PASSWORD_RESET_REQUEST});

        fetch(resetUrl, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "password": password,
                "token": verificationToken
            })
        })
        .then(res => res.ok ? res.json() : Promise.reject(res))
        .then(res => {
            if(res.success) {
                dispatch({type: ActionTypes.PASSWORD_RESET_SUCCESS});
            } else {
                throw new Error('resetPassword failed');
            }
        })
        .catch( res => {
            console.log('resetPassword failed '+res);
            dispatch({type: ActionTypes.PASSWORD_RESET_FAILED});
        });
    }
    
}

export const runServerRequest = (dispatch: AppDispatch, requestFunction:(f:any) => Promise<any>, requestFunctionParams: object | undefined) => {

    requestFunction(requestFunctionParams).then( res => {
        dispatch({type: ActionTypes.USER_REFRESH_SUCCESS, user: res.user});
      })
      .catch( res => {
        if(res.status === 401 || res.message === 'jwt expired') {
          refreshToken().then( res => {
              setToken(res);
              requestFunction(requestFunctionParams)
              .then(res => {
                dispatch({type: ActionTypes.USER_REFRESH_SUCCESS, user: res.user});
              })
          })
          .catch( () => {
              console.log('token didn\'t refresh');
          });
        } else {
          console.log('something went wrong with authorization: try re-login')
        }
      })
}

export const refreshUser: AppThunk = () => {

    return (dispatch: AppDispatch) => {
        runServerRequest(dispatch, getProfileSettings, undefined);
    }
}

export const updateUser: AppThunk = (updatedUserSettings: object) => {

    return (dispatch: AppDispatch) => {
        runServerRequest(dispatch, updateProfileSettings, updatedUserSettings);
    }
}





