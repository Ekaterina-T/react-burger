import { refreshTokenName, accessTokenName } from "./constants";
import { authEndpoints } from "./constants";
import { getCookie, setCookie } from "./cookie";

const serverRequest = (url: string, options: {[name: string]: any}) => {

    return fetch(url, options)
            .then(res => res.ok ? res.json() : Promise.reject(res))
            .then(res => res.success ? res : Promise.reject(res))
            .catch( res => {
                console.log('please authorize');
            });
};

export const refreshToken = () => {

    return serverRequest(authEndpoints.tokenUrl, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({"token": window.localStorage.getItem(refreshTokenName)})
    }).catch( res => {console.log('refresh token')});
}

export const getProfileSettings = () => {

    return serverRequest(authEndpoints.userUrl, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': getCookie(accessTokenName)
        }
    }).catch( res => {console.log('profile setting')});
}

export const updateProfileSettings = (updatedUserSettings: object) => {

    return serverRequest(authEndpoints.userUrl, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            authorization: getCookie(accessTokenName)
        },
        body: JSON.stringify(updatedUserSettings)
    }).catch( res => {console.log('updateProfileSettings')});
}

export const setToken = (data : {accessToken: string, refreshToken: string}) : void => {
    setCookie(accessTokenName, data.accessToken, {expires: 20*60});
    window.localStorage.setItem(refreshTokenName, data.refreshToken); 
}