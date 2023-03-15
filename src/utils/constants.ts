/* eslint-disable import/no-cycle */
import { TSocketList, TIngredientGroup } from '../services/types';

const ingredientGroups: Array<TIngredientGroup> = [
  { type: 'bun', name: 'Булки' },
  { type: 'sauce', name: 'Соусы' },
  { type: 'main', name: 'Начинки' },
];

const domain = 'https://norma.nomoreparties.space/api';

const dataUrl = `${domain}/ingredients`;
const orderUrl = `${domain}/orders`;

const authEndpoints = {
  registerUrl: `${domain}/auth/register`,
  authUrl: `${domain}/auth/login`,
  logoutUrl: `${domain}/auth/logout`,
  tokenUrl: `${domain}/auth/token`,
  userUrl: `${domain}/auth/user`,
};

const ws = 'wss://norma.nomoreparties.space';
const allOrdersWS = `${ws}/orders/all`;
const personalOrdersWS = `${ws}/orders`;

const socketType: TSocketList = {
  allOrders: 'allOrders',
  personalOrders: 'personalOrders',
};

const passwordResetUrl = `${domain}/password-reset`;
const resetUrl = `${domain}/password-reset/reset`;

const accessTokenName = 'rb_accessToken';
const refreshTokenName = 'rb_refreshToken';

// TODO: unite urls into objects
export {
  dataUrl, orderUrl, ingredientGroups, passwordResetUrl, resetUrl, authEndpoints,
  allOrdersWS, personalOrdersWS, socketType,
  accessTokenName, refreshTokenName,
};
