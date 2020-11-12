import {
    ADD_PRODUCT_URL,
    getEditOrDeleteProductUrl,
    getChangeQuantityUrl,
    LIST_PRODUCTS_URL,
    REGISTER_URL, PASSWORD_LOGIN_URL
} from "../constants/APIConstants";
import {AccessToken, JwtToken, Product, ProductApi, User} from "./models";
import {gretch} from "gretchen";
import {getAccessToken} from "../storage/store";

export const getAllProducts = async (): Promise<Product[]> => {

    const authorization = await authorizationHeader();

    const {data, error} = await gretch<Product[]>(LIST_PRODUCTS_URL, {
        method: 'GET',
        headers: Object.assign({...contentType, ...authorization}),
    }).json();

    if (error) {
        throw error
    }

    return data ? data : [];
};

export const addProduct = async (productApi: ProductApi): Promise<Product> => {
    const authorization = await authorizationHeader();

    const {data, error} = await gretch<Product>(ADD_PRODUCT_URL, {
        method: 'POST',
        headers: Object.assign({...contentType, ...authorization}),
        body: JSON.stringify(productApi)
    }).json();

    if (error) {
        throw error;
    }

    return data!!
};

export const editProduct = async (productApi: ProductApi, productId: bigint): Promise<Product> => {

    const authorization = await authorizationHeader();

    const url = getEditOrDeleteProductUrl(productId);
    const {data, error} = await gretch<Product>(url, {
        method: 'PUT',
        headers: Object.assign({...contentType, ...authorization}),
        body: JSON.stringify(productApi)
    }).json();

    if (error) {
        throw error;
    }

    return data!!;
};

export const changeQuantity = async (productId: bigint, quantity: bigint): Promise<void> => {

    const authorization = await authorizationHeader();

    const url = getChangeQuantityUrl(productId);
    const {data, error} = await gretch(url, {
        method: 'PATCH',
        headers: Object.assign({...contentType, ...authorization}),
        body: quantity.toString()
    }).json();

    if(error) {
        throw error;
    }

};


export const deleteProduct = async (productId: bigint): Promise<void> => {
    const authorization = await authorizationHeader();

    const url = getEditOrDeleteProductUrl(productId);
    const {data, error} = await gretch(url, {
        method: 'DELETE',
        headers: Object.assign({...contentType, ...authorization}),
    }).json();

    if (error) {
        throw error;
    }

};

export const register = async (user: User): Promise<void> => {

    const {data, error} = await gretch(REGISTER_URL, {
        method: 'POST',
        headers: contentType,
        body: JSON.stringify(user)
    }).json()

    if(error) {
        throw error;
    }
};

export const login = async (username: string, password: string): Promise<JwtToken> => {

    const params = new URLSearchParams({
        username: username,
        password: password,
        'grant_type': 'password',
    });

    const {data, error} = await gretch<AccessToken>(PASSWORD_LOGIN_URL, {
        method: 'POST',
        headers: loginHeaders,
        body: params.toString()
    }).json();


    if (error) {
        throw error
    }

    const jwtToken = mapToJwt(data!!);
    return jwtToken;
};

const mapToJwt = (accessToken: AccessToken): JwtToken => {

    const date = new Date();
    const seconds = date.getSeconds() + accessToken.expires_in;
    date.setSeconds(seconds);
    return {
        accessToken: accessToken.access_token,
        refreshToken: accessToken.refresh_token,
        tokenType: accessToken.token_type,
        expiry: date

    } as JwtToken;
};


export const contentType = {'Content-Type': 'application/json'};
export const loginHeaders = {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': 'Basic Y2xpZW50OnNlY3JldA==',
};

export const authorizationHeader = async (): Promise<any> => {
    const accessToken = await getAccessToken() as string;
    return {'Authorization': 'Bearer ' + accessToken}
};
