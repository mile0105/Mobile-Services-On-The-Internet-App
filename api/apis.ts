import {
    ADD_PRODUCT_URL,
    getEditOrDeleteProductUrl,
    getChangeQuantityUrl,
    LIST_PRODUCTS_URL,
    REGISTER_URL, PASSWORD_LOGIN_URL
} from "../constants/APIConstants";
import {JwtToken, Product, ProductApi, User} from "./models";
import {gretch} from "gretchen";

export const getAllProducts = async (): Promise<Product[]> => {

    const {data, error} = await gretch<Product[]>(LIST_PRODUCTS_URL, {
        method: 'GET',
        headers: contentType
        //todo add JWT token
    }).json();

    if(error) {
        throw new Error(error)
    }

    return data? data : [];
};

export const addProduct = async (productApi: ProductApi): Promise<void> => {
    const {data, error} = await gretch(ADD_PRODUCT_URL, {
        method: 'POST',
        headers: contentType,
        //todo add token to headers
        body: JSON.stringify(productApi)
    }).json()
};

export const editProduct = async (productApi: ProductApi, productId: bigint): Promise<Product> => {
    const url = getEditOrDeleteProductUrl(productId);
    const {data, error} = await gretch<Product>(url, {
        method: 'PUT',
        headers: contentType, //todo add token to headers
        body: JSON.stringify(productApi)
    }).json();
    return data!!;
};

export const changeQuantity = async (productId: bigint, quantity: bigint): Promise<void> => {
    const url = getChangeQuantityUrl(productId);
    const {data, error} = await gretch(url, {
        method: 'PATCH',
        headers: contentType, //todo add token to headers
        body: quantity.toString()
    }).json();
};


export const deleteProduct = async (productId: bigint): Promise<void> => {
    const url = getEditOrDeleteProductUrl(productId);
    const {data, error} = await gretch(url, {
        method: 'DELETE',
        headers: contentType, //todo add token to headers
    }).json();
};

export const register = async (user: User): Promise<void> => {

    const {data, error} = await gretch(REGISTER_URL, {
        method: 'POST',
        headers: contentType,
        body: JSON.stringify(user)
    }).json()
};

export const login = async (username: string, password: string): Promise<JwtToken> => {
    const {data, error} = await gretch<JwtToken>(PASSWORD_LOGIN_URL, {
        method: 'POST',
        headers: loginHeaders,
        body: new URLSearchParams({
            username: username,
            password: password,
            'grant_type': 'password',
        })
    }).json();

    if (error) {
        throw new Error(error.error)
    }

    return data!!;
};


export const contentType = {'Content-Type': 'application/json'};
export const loginHeaders = {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': 'Basic Y2xpZW50OnNlY3JldA==',
};
