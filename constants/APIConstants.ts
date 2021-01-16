export const BASE_URL = 'https://mobile-services-backend.herokuapp.com';
// export const BASE_URL = 'http://localhost:8080';
export const API_VERSION_PREFIX = "/api/v1";
export const API_VERSION_V2_PREFIX = "/api/v2";

export const PASSWORD_LOGIN_URL = BASE_URL + API_VERSION_PREFIX + '/users/login';
export const GOOGLE_LOGIN_URL = BASE_URL + API_VERSION_PREFIX + '/users/register/google';
export const REGISTER_URL = BASE_URL + API_VERSION_PREFIX + '/users/register';
export const LIST_PRODUCTS_URL = BASE_URL + API_VERSION_PREFIX + '/products';
export const ADD_PRODUCT_URL = LIST_PRODUCTS_URL;


export const LIST_WAREHOUSES_URL = BASE_URL + API_VERSION_V2_PREFIX + '/warehouses';

export const getChangeQuantityUrl = (productId: number): string => {
    return `${BASE_URL}${API_VERSION_PREFIX}/products/${productId}/quantity`;
};

export const getEditOrDeleteProductUrl = (productId: number): string => {
    return `${BASE_URL}${API_VERSION_PREFIX}/products/${productId}`;
};

export const getChangeQuantityUrlV2 = (productId: number, warehouseId: number): string => {
    return `${BASE_URL}${API_VERSION_V2_PREFIX}/warehouses/${warehouseId}/products/${productId}/quantity`;
};
