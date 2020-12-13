import {Product, ProductApi} from "./models";
import {
    addToCachedProductsToBeAdded, addToCachedProductsToBeDeleted, addToCachedProductsToBeEdited,
    getCachedProductsToBeAdded, getCachedProductsToBeEdited,
    hasDeletePermissions, updateCachedProductsToBeAdded, updateCachedProductsToBeEdited,
} from "../storage/store";

export const storeAddProductToLocalStorage = async (productApi: ProductApi): Promise<Product> => {

    const productsInLocalStorage = await getCachedProductsToBeAdded();

    const product = {
        modelName: productApi.modelName,
        manufacturerName: productApi.manufacturerName,
        price: productApi.price,
        quantity: 0,
        id: getProductIdFromLocalProducts(productsInLocalStorage)
    } as Product;

    await addToCachedProductsToBeAdded(product);
    return product;
};

export const storeEditProductToLocalStorage = async (productId: number, productApi: ProductApi, quantity: number): Promise<Product> => {
    const product = {
        modelName: productApi.modelName,
        manufacturerName: productApi.manufacturerName,
        price: productApi.price,
        quantity: quantity,
        id: productId
    } as Product;

    if (productId < 0) {
        //search for product in products to be added
        const productsInLocalStorage = await getCachedProductsToBeAdded();
        const index = productsInLocalStorage.findIndex(product => product.id === productId);
        if (index === -1) {
            //shouldn't happen
            throw Error('something went wrong')
        }

        productsInLocalStorage[index] = product;

        await updateCachedProductsToBeAdded(productsInLocalStorage);
        return product;
    }

    const productsToBeEditedInLocalStorage = await getCachedProductsToBeEdited();

    const index = productsToBeEditedInLocalStorage.findIndex(product => product.id === productId);

    if (index === -1) {
        await addToCachedProductsToBeEdited(product);
    } else {
        productsToBeEditedInLocalStorage[index] = product;
        await updateCachedProductsToBeEdited(productsToBeEditedInLocalStorage);
    }

    return product;
};

export const storeDeleteProductToLocalStorage = async (productId: number): Promise<void> => {
    const canDelete = await hasDeletePermissions();
    if (canDelete) {
        if (productId < 0) {
            const productsInLocalStorage = await getCachedProductsToBeAdded();
            const index = productsInLocalStorage.findIndex(product => product.id === productId);
            if (index === -1) {
                //shouldn't happen
                throw Error('something went wrong')
            }
            await updateCachedProductsToBeAdded(productsInLocalStorage.splice(index, 1));
        } else {
            const productsToBeEditedInLocalStorage = await getCachedProductsToBeEdited();

            const index = productsToBeEditedInLocalStorage.findIndex(product => product.id === productId);
            if (index !== -1) {
                await updateCachedProductsToBeEdited(productsToBeEditedInLocalStorage.splice(index, 1));
            }
            await addToCachedProductsToBeDeleted(productId);

        }

    } else {
        alert('You do not have permission to do that');
    }
};


const getProductIdFromLocalProducts = (products: Product[]): number => {
    if (products.length === 0) {
        return -1;
    }
    const ids = products.map(product => product.id).concat();
    let min = ids[0];

    for (let i = 1; i < ids.length; i++) {
        if (ids[i] < min) {
            min = ids[i];
        }
    }

    return min - 1;
};
