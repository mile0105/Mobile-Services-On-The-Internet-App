export const BASE_URL = 'https://mobile-services-backend.herokuapp.com';
// export const BASE_URL = 'http://localhost:8080';
export const API_VERSION_PREFIX = "/api/v1";

export const PASSWORD_LOGIN_URL = BASE_URL + '/oauth/token';
export const REGISTER_URL = BASE_URL + API_VERSION_PREFIX + '/users/register';
export const LIST_PRODUCTS_URL = BASE_URL + API_VERSION_PREFIX + '/products';
export const ADD_PRODUCT_URL = LIST_PRODUCTS_URL;


export const getChangeQuantityUrl = (productId: bigint): string => {
    return `${BASE_URL}${API_VERSION_PREFIX}/products/${productId}/quantity`;
};

export const getEditOrDeleteProductUrl = (productId: bigint): string => {
    return `${BASE_URL}${API_VERSION_PREFIX}/products/${productId}`;
};
