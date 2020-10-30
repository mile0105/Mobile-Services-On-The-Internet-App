import {
    ADD_PRODUCT_URL, getDecreaseQuantityUrl,
    getEditOrDeleteProductUrl,
    getIncreaseQuantityUrl,
    LIST_PRODUCTS_URL,
    REGISTER_URL
} from "../constants/APIConstants";
import {Product, ProductApi, User} from "./models";
import {gretch} from "gretchen";

export const getAllProducts = async (): Promise<Product[]> => {

    const {data, error} = await gretch<Product[]>(LIST_PRODUCTS_URL, {
        method: 'GET',
        headers: contentType
        //todo add JWT token
    }).json();

    if(error) {
        //handle error
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

export const increaseQuantity = async (productId: bigint, quantity: bigint): Promise<void> => {
    const url = getIncreaseQuantityUrl(productId);
    const {data, error} = await gretch(url, {
        method: 'PUT',
        headers: contentType, //todo add token to headers
        body: quantity.toString()
    }).json();
};

export const decreaseQuantity = async (productId: bigint, quantity: bigint): Promise<void> => {
    const url = getDecreaseQuantityUrl(productId);
    const {data, error} = await gretch(url, {
        method: 'PUT',
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

    const{data, error} = await gretch(REGISTER_URL, {
        method: 'POST',
        headers: contentType,
        body: JSON.stringify(user)
    }).json()
};


export const contentType = {'Content-Type': 'application/json'};
