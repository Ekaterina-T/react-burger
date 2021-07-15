import { refreshTokenName, accessTokenName } from "./constants";
import { authEndpoints } from "./constants";
import { getCookie, setCookie } from "./cookie";

const serverRequest = (url, options) => {

    return fetch(url, options)
            .then(res => res.ok ? res.json() : Promise.reject(res))
            .then(res => res.success ? res : Promise.reject(res))
        
};

export const refreshToken = () => {

    return serverRequest(authEndpoints.tokenUrl, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({"token": window.localStorage.getItem(refreshTokenName)})
    });
}

export const getProfileSettings = () => {

    return serverRequest(authEndpoints.userUrl, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': getCookie(accessTokenName)
        }
    });
}

export const updateProfileSettings = (updatedUserSettings) => {

    return serverRequest(authEndpoints.userUrl, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            authorization: getCookie(accessTokenName)
        },
        body: JSON.stringify(updatedUserSettings)
    });
}

export const setToken = (data) => {
    setCookie(accessTokenName, data.accessToken, {expires: 20*60});
    window.localStorage.setItem(refreshTokenName, data.refreshToken); 
}