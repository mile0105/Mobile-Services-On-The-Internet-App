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
import {
  addProductOnServer,
  changeQuantityOnServer,
  deleteProductOnTheServer,
  editProductOnServer
} from "../api/apis";
import {ToastAndroid} from "react-native";

export const sync = async () => {

  let errorMessage = '';
  const productsToBeAdded = await getCachedProductsToBeAdded();
  const productsToBeEdited = await getCachedProductsToBeEdited();
  const productIdsToBeDeleted = await getCachedProductsToBeDeleted();
  const productDeltas = await getProductDeltas();

  const failedProductsToBeAdded: Product[] = [];
  const failedProductsToBeEdited: Product[] = [];
  const failedProductsToBeDeleted: Product[] = [];
  const failedProductDeltas: ProductDelta[] = [];

  for (let product of productsToBeAdded) {
    try {
      const productId = product.id;
      const productApi = {
        price: product.price,
        modelName: product.modelName,
        manufacturerName: product.manufacturerName,
      } as ProductApi;

      const savedProduct = await addProductOnServer(productApi);
      const index = productDeltas.findIndex(delta => delta.productId === productId);
      if (index !== -1) {
        productDeltas[index] = {...productDeltas[index], productId: savedProduct.id};
      }

    } catch (e) {
      errorMessage += `\nFailed to add product: ${product.manufacturerName} ${product.modelName}`;
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
      errorMessage += `\nFailed to edit product: ${product.manufacturerName} ${product.modelName}`;
      failedProductsToBeEdited.push(product);
      console.log(e);
    }
  }

  for (let product of productIdsToBeDeleted) {
    try {
      await deleteProductOnTheServer(product.id)
    } catch (e) {
      errorMessage += `\nFailed to add product: ${product.manufacturerName} ${product.modelName}`;
      failedProductsToBeDeleted.push(product);
      console.log(e);
    }
  }

  for (let delta of productDeltas) {
    try {
      const {productId, quantity, warehouseId} = delta;
      await changeQuantityOnServer(productId, quantity, warehouseId);
    } catch (e) {
      errorMessage += `\nFailed to synchronize product quantity for product: ${delta.productName}`;
      failedProductDeltas.push(delta);
      console.log(e);
    }
  }

  await updateCachedProductsToBeAdded(failedProductsToBeAdded);
  await updateCachedProductsToBeEdited(failedProductsToBeEdited);
  await updateCachedProductsToBeDeleted(failedProductsToBeDeleted);
  await updateProductDeltas(failedProductDeltas);

  if (errorMessage !== '') {
    ToastAndroid.show(`Errors in synchronization: ${errorMessage}`, ToastAndroid.LONG);
  }

};



