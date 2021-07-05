import {authEndpoints, passwordResetUrl} from '../../utils/constants';
import {setCookie, deleteCookie} from '../../utils/cookie';

import {ActionTypes} from '../actionTypes';

const accessTokenName = 'rb_accessToken';
const refreshTokenName = 'rb_refreshToken';

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
            setCookie(accessTokenName, res.accessToken, {expires: 20*60});
            window.localStorage.setItem(refreshTokenName, res.refreshToken);   
            dispatch({type:  ActionTypes.REGISTER_SUCCESS, data: res});
        })
        .catch( res => {
            //TODO: error handling
            console.log(res);            
            dispatch({type:  ActionTypes.REGISTER_FAILED});
        });

    }
};

export const login = (email, password, name) => {

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
            
            setCookie(accessTokenName, res.accessToken, {expires: 20*60});
            window.localStorage.setItem(refreshTokenName, res.refreshToken);          
            dispatch({type:  ActionTypes.LOGIN_SUCCESS, data: res});
        })
        .catch( res => {
            //TODO: error handling
            console.log(res);            
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
        .then(() => {
            /*
                {
                    "success": true,
                    "message": "Successful logout"
                } 
            */       
            deleteCookie(accessTokenName);
            window.localStorage.removeItem(refreshTokenName);
            dispatch({type:  ActionTypes.LOGOUT_SUCCESS});
        })
        .catch( res => {
            //TODO: error handling
            console.log(res);     
            dispatch({type:  ActionTypes.LOGOUT_FAILED});
        });

    }
};


export const resetPassword = (email) => {

    return dispatch => {

        dispatch({type: ActionTypes.PASSWORD_RESET_REQUEST});

        fetch(passwordResetUrl, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({"email": email})
        })
        .then(res => res.ok ? res.json() : Promise.reject(res))
        .then(res => {
            dispatch({type:  ActionTypes.PASSWORD_RESET_SUCCESS, data: res.data});
            //TODO: redirect to reset-password
            console.log(res);
        })
        .catch( res => {
            //TODO: error handling
            dispatch({type:  ActionTypes.PASSWORD_RESET_FAILED});
            console.log(res);
        });

    }
};




