import {authEndpoints, passwordResetUrl, resetUrl} from '../../utils/constants';
import {setCookie, deleteCookie, getCookie} from '../../utils/cookie';

import {ActionTypes} from '../actionTypes';

import { accessTokenName,  refreshTokenName} from '../../utils/constants';

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
               dispatch({type:  ActionTypes.REGISTER_SUCCESS, data: res});
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
               setCookie(accessTokenName, res.accessToken, {expires: 20*60});
               window.localStorage.setItem(refreshTokenName, res.refreshToken);
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

export const recognizeUser = () => {

    return dispatch => {

        const refreshToken = () => {
            //console.log('refreshToken start')
        
            fetch(authEndpoints.tokenUrl, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({"token": window.localStorage.getItem(refreshTokenName)})
            })
            .then(res => res.ok ? res.json() : Promise.reject(res))
            .then((res) => {

                //console.log('refreshToken success')

                if(res.success) {               
                    setCookie(accessTokenName, res.accessToken, {expires: 20*60});
                    window.localStorage.setItem(refreshTokenName, res.refreshToken); 
                    dispatch({type: ActionTypes.LOGIN_SUCCESS});
                } else {
                    console.log('refreshToken fail from server')
                    throw new Error('Token refresh failed');
                }
            })
            .catch( () => {   
                //console.log('refreshToken logout')           
                dispatch({type: ActionTypes.LOGOUT_SUCCESS});
            });
        }

        //console.log(' recognize start')

        fetch(authEndpoints.userUrl, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': getCookie(accessTokenName)
                }
            })
            .then(res => res.ok ? res.json() : Promise.reject(res))
            .then(res => {
                    //console.log(' recognize success')
                if(res.success === true) {
                    dispatch({type: ActionTypes.LOGIN_SUCCESS, user: res.user});
                } else {
                    //console.log(' recognize fail from server')
                    Promise.reject('user\'s authorization is not confirmed');
                }      
            })
            .catch(res => {
                //console.log(' recognize fail handler')
            
                if(!getCookie(accessTokenName) || res.message === 'jwt expired') {
                    //console.log(' recognize token expired')
                    refreshToken();
                }
            });

    }
}

export const updateProfileSettings = (updatedUserSettings) => {

    return dispatch => {

        dispatch({type: ActionTypes.USER_SETTINGS_UPDATE_REQUEST});

        fetch(authEndpoints.userUrl, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                authorization: getCookie(accessTokenName)
            },
            body: JSON.stringify(updatedUserSettings)
        })
        .then(res => res.ok ? res.json() : Promise.reject(res))
        .then( (res) => {
            /*
                {
                    "success": true,
                    "user": {
                    "email": "",
                    "name": ""
                    }
                } 
            */
            if(res.success) {
                dispatch({type: ActionTypes.USER_SETTINGS_UPDATE_SUCCESS, user: res.user});
            } else {
                throw new Error('updateProfileSettings failed');
            }
            
        }).catch( (res) => {
            dispatch({type: ActionTypes.USER_SETTINGS_UPDATE_FAILED});
            console.log('credential are not updated')
        });

    }

    
};


