const ingredientGroups = [
    { type: 'bun', name: 'Булки' },
    { type: 'sauce', name: 'Соусы' },
    { type: 'main', name: 'Начинки' }
 ];

 const domain = "https://norma.nomoreparties.space/api";

 const dataUrl = domain + "/ingredients";
 const orderUrl = domain + "/orders";

 const authEndpoints = {
    registerUrl: domain + "/auth/register",
    authUrl: domain + "/auth/login", 
    logoutUrl: domain + "/auth/logout",
    tokenUrl: domain + "/auth/token",
    userUrl: domain + "/auth/user"
 };
 
 const allOrdersWS = "wss://norma.nomoreparties.space/orders/all";

 const passwordResetUrl = domain + "/password-reset";
 const resetUrl = domain + "/password-reset/reset";

const accessTokenName = 'rb_accessToken';
const refreshTokenName = 'rb_refreshToken';

 //TODO: unite urls into objects
 export {dataUrl, orderUrl, ingredientGroups, passwordResetUrl, resetUrl, authEndpoints, allOrdersWS,
    accessTokenName, refreshTokenName
};