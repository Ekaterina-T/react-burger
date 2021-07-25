import {authEndpoints, passwordResetUrl, resetUrl} from '../../utils/constants';
import {setCookie, deleteCookie} from '../../utils/cookie';

import {ActionTypes} from '../actionTypes';

import { accessTokenName,  refreshTokenName} from '../../utils/constants';
import { getProfileSettings, updateProfileSettings, refreshToken, setToken } from '../../utils/token';

export const register = (email, password, name) => {

    return dispatch => {

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

export const login = (email, password) => {

    return dispatch => {

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
        });

    }
};

export const logout = () => {

    return dispatch => {

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

export const requestPasswordResetCode = (email) => {

    return dispatch => {

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

export const resetPassword = (password, verificationToken) => {

    return dispatch => {

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

export const runServerRequest = (dispatch, requestFunction, requestFunctionParams) => {

    requestFunction(requestFunctionParams).then( res => {
        dispatch({type: ActionTypes.USER_REFRESH_SUCCESS, user: res.user});
      })
      .catch( res => {
        if(res.status === 401 || res.message === 'jwt expired') {
          refreshToken().then( res => {
              setToken(res);
              requestFunction(requestFunctionParams).then(res => {
                dispatch({type: ActionTypes.USER_REFRESH_SUCCESS, user: res.user});
              })
          });
        } else {
          console.error('something went wrong with authorization: try re-login')
        }
      });
}

export const refreshUser = () => {

    return dispatch => {
        runServerRequest(dispatch, getProfileSettings, null);
    }
}

export const updateUser = (updatedUserSettings) => {

    return dispatch => {
        runServerRequest(dispatch, updateProfileSettings, updatedUserSettings);
    }
}





