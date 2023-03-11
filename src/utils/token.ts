/* eslint-disable import/no-cycle */
import { refreshTokenName, accessTokenName, authEndpoints } from './constants';

import { getCookie, setCookie } from './cookie';

const serverRequest = (url: string, options: { [name: string]: any }) => fetch(url, options)
  .then((res) => (res.ok ? res.json() : Promise.reject(res)))
  .then((res) => (res.success ? res : Promise.reject(res)))
  .catch(() => {
    console.log('please authorize');
  });

export const refreshToken = () => serverRequest(authEndpoints.tokenUrl, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ token: window.localStorage.getItem(refreshTokenName) }),
})
  .catch(() => { console.log('refresh token'); });

export const getProfileSettings = () => serverRequest(authEndpoints.userUrl, {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    Authorization: getCookie(accessTokenName),
  },
})
  .catch(() => { console.log('profile setting'); });

// eslint-disable-next-line max-len
export const updateProfileSettings = (updatedUserSettings: object) => serverRequest(authEndpoints.userUrl, {
  method: 'PATCH',
  headers: {
    'Content-Type': 'application/json',
    authorization: getCookie(accessTokenName),
  },
  body: JSON.stringify(updatedUserSettings),
}).catch(() => { console.log('updateProfileSettings'); });

export const setToken = (data : { accessToken: string, refreshToken: string }) : void => {
  setCookie(accessTokenName, data.accessToken, { expires: 20 * 60 });
  window.localStorage.setItem(refreshTokenName, data.refreshToken);
};
