import {
    getCachedProductsToBeAdded,
    getCachedProductsToBeDeleted,
    getCachedProductsToBeEdited,
    getProductDeltas,
    updateCachedProductsToBeAdded,
    updateCachedProductsToBeDeleted,
    updateCachedProductsToBeEdited,
    updateProductDeltas
} from "../storage/store";
import {Product, ProductApi, ProductDelta} from "../api/models";
import {addProduct, changeQuantityOnServer, deleteProduct, editProductOnServer} from "../api/apis";

export const sync = async () => {

    const productsToBeAdded = await getCachedProductsToBeAdded();
    const productsToBeEdited = await getCachedProductsToBeEdited();
    const productIdsToBeDeleted = await getCachedProductsToBeDeleted();
    const productDeltas = await getProductDeltas();

    const failedProductsToBeAdded: Product[] = [];
    const failedProductsToBeEdited: Product[] = [];
    const failedProductIdsToBeDeleted: number[] = [];
    const failedProductDeltas: ProductDelta[] = [];

    for (let product of productsToBeAdded) {
        try {
            const productId = product.id;
            const productApi = {
                price: product.price,
                modelName: product.modelName,
                manufacturerName: product.manufacturerName,
            } as ProductApi;

            const savedProduct = await addProduct(productApi);
            const index = productDeltas.findIndex(delta => delta.productId === productId);
            if (index !== -1) {
                productDeltas[index] = {...productDeltas[index], productId: savedProduct.id};
            }

        } catch (e) {
            failedProductsToBeAdded.push(product);
            console.log(e);
        }
    }

    for (let product of productsToBeEdited) {
        try {
            const productApi = {
                price: product.price,
                modelName: product.modelName,
                manufacturerName: product.manufacturerName,
                lastUpdate: product.lastUpdate
            } as ProductApi;
            await editProductOnServer(productApi, product.id);
        } catch (e) {
            failedProductsToBeEdited.push(product);
            console.log(e);
        }
    }

    for (let productId of productIdsToBeDeleted) {
        try {
            await deleteProduct(productId)
        } catch (e) {
            failedProductIdsToBeDeleted.push(productId);
            console.log(e);
        }
    }

    for (let delta of productDeltas) {
        try {
            const {productId, quantity} = delta;
            await changeQuantityOnServer(productId, quantity);
        } catch (e) {
            failedProductDeltas.push(delta);
            console.log(e);
        }
    }

    await updateCachedProductsToBeAdded(failedProductsToBeAdded);
    await updateCachedProductsToBeEdited(failedProductsToBeEdited);
    await updateCachedProductsToBeDeleted(failedProductIdsToBeDeleted);
    await updateProductDeltas(failedProductDeltas);
};



