const ingredientGroups = [
    { type: 'bun', name: 'Булки' },
    { type: 'sauce', name: 'Соусы' },
    { type: 'main', name: 'Начинки' }
 ];

 const domain = "https://norma.nomoreparties.space/api";
 const dataUrl = domain + "/ingredients";
 const orderUrl = domain + "/orders";
 const passwordResetUrl = domain + "/password-reset";
 const resetUrl = domain + "/password-reset/reset."
 const registerUrl = domain + "/auth/register";

 export {dataUrl, orderUrl, ingredientGroups, passwordResetUrl, resetUrl, registerUrl};