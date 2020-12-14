import {
    ADD_PRODUCT_URL,
    getEditOrDeleteProductUrl,
    getChangeQuantityUrl,
    LIST_PRODUCTS_URL,
    REGISTER_URL, PASSWORD_LOGIN_URL, GOOGLE_LOGIN_URL
} from "../constants/APIConstants";
import {JwtToken, Product, ProductApi, ProductDelta, User} from "./models";
import {gretch} from "gretchen";
import {addProductDelta, getAccessToken} from "../storage/store";
import {isConnected} from "../network/utils";
import {
    storeAddProductToLocalStorage,
    storeDeleteProductToLocalStorage,
    storeEditProductToLocalStorage
} from "./synchelper";

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

    const hasInternetConnection = await isConnected();
    if (!hasInternetConnection) {
        return await storeAddProductToLocalStorage(productApi);
    }

    return await addProductOnServer(productApi);
};

export const addProductOnServer = async (productApi: ProductApi): Promise<Product> => {
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

export const editProduct = async (productApi: ProductApi, productId: number, quantity: number): Promise<Product> => {

    const hasInternetConnection = await isConnected();

    if (!hasInternetConnection) {
        return await storeEditProductToLocalStorage(productId, productApi, quantity)
    }
    return await editProductOnServer(productApi, productId);
};

export const editProductOnServer = async (productApi: ProductApi, productId: number): Promise<Product> => {
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

export const changeQuantity = async (product: Product, newQuantity: number, oldQuantity: number): Promise<void> => {

    const productId = product.id;
    const hasInternetConnection = await isConnected();
    if (!hasInternetConnection) {
        if (newQuantity + oldQuantity < 0) {
            throw Error('Quantity must not be less than 0');
        }
        const productDelta = {
            productId: productId,
            quantity: newQuantity,
            productName: `${product.manufacturerName} ${product.modelName}`
        } as ProductDelta;
        await addProductDelta(productDelta);
        return;
    }
    await changeQuantityOnServer(productId, newQuantity)
};

export const changeQuantityOnServer = async (productId: number, quantity: number): Promise<void> => {
    const authorization = await authorizationHeader();

    const url = getChangeQuantityUrl(productId);
    const {data, error} = await gretch(url, {
        method: 'PATCH',
        headers: Object.assign({...contentType, ...authorization}),
        body: quantity.toString()
    }).json();

    if (error) {
        throw error;
    }
};

export const deleteProductOnTheServer = async (productId: number): Promise<void> => {
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

export const deleteProduct = async (product: Product): Promise<void> => {

    const hasInternetConnection = await isConnected();

    if (!hasInternetConnection) {
        return await storeDeleteProductToLocalStorage(product)
    }
    return await deleteProductOnTheServer(product.id);
};

export const register = async (user: User): Promise<void> => {

    const {data, error} = await gretch(REGISTER_URL, {
        method: 'POST',
        headers: contentType,
        body: JSON.stringify(user)
    }).json();

    if (error) {
        throw error;
    }
};

export const login = async (username: string, password: string): Promise<JwtToken> => {

    const body = {
        username: username,
        password: password
    };

    const {data, error} = await gretch<JwtToken>(PASSWORD_LOGIN_URL, {
        method: 'POST',
        headers: contentType,
        body: JSON.stringify(body)
    }).json();

    if (error) {
        throw error
    }

    return data!!;
};

export const loginWithGoogle = async (googleToken: string): Promise<JwtToken> => {

    const {data, error} = await gretch<JwtToken>(GOOGLE_LOGIN_URL, {
        method: 'POST',
        headers: contentType,
        body: googleToken,
    }).json();

    if (error) {
        throw error;
    }

    return data!!;
};

export const contentType = {'Content-Type': 'application/json'};

export const authorizationHeader = async (): Promise<any> => {
    const accessToken = await getAccessToken() as string;
    return {'Authorization': 'Bearer ' + accessToken}
};
