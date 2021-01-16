import {JwtToken, Product, ProductDelta} from "../api/models";
import AsyncStorage from '@react-native-async-storage/async-storage';


const ACCESS_TOKEN_KEY = "access_token";
const CACHED_PRODUCTS_TO_BE_ADDED = "cached_products_to_be_added";
const CACHED_PRODUCTS_TO_BE_EDITED = "cached_products_to_be_edited";
const CACHED_PRODUCTS_TO_BE_DELETED = "cached_products_to_be_deleted";
const CACHED_PRODUCTS_AND_DELTAS = "cached_products_and_deltas";

export const storeJwt = async (token: JwtToken): Promise<void> => {
  await AsyncStorage.setItem(ACCESS_TOKEN_KEY, JSON.stringify(token));
};

export const removeAccessToken = async (): Promise<void> => {
  await AsyncStorage.removeItem(ACCESS_TOKEN_KEY);
};

export const getAccessToken = async (): Promise<string | null> => {
  const tokenString = await AsyncStorage.getItem(ACCESS_TOKEN_KEY);
  if (tokenString == null) {
    console.log('error');
    return null;
  }
  const token = JSON.parse(tokenString!!) as JwtToken;
  return token.accessToken;
};

export const hasDeletePermissions = async (): Promise<boolean> => {
  const tokenString = await AsyncStorage.getItem(ACCESS_TOKEN_KEY);
  if (tokenString == null) {
    console.log('error');
    return false;
  }
  const token = JSON.parse(tokenString!!) as JwtToken;
  return token.hasDeletePermission;
};

export const addToCachedProductsToBeAdded = async (product: Product): Promise<void> => {
  const products = await getCachedProductsToBeAdded();
  products.push(product);
  await updateCachedProductsToBeAdded(products);
};

export const getCachedProductsToBeAdded = async (): Promise<Product[]> => {
  const productsString = await AsyncStorage.getItem(CACHED_PRODUCTS_TO_BE_ADDED);
  if (productsString == null) {
    return [];
  }
  return JSON.parse(productsString) as Product[];
};

export const updateCachedProductsToBeAdded = async (products: Product[]): Promise<void> => {
  await AsyncStorage.setItem(CACHED_PRODUCTS_TO_BE_ADDED, JSON.stringify(products));
};

export const addToCachedProductsToBeEdited = async (product: Product): Promise<void> => {
  const products = await getCachedProductsToBeEdited();
  products.push(product);
  await updateCachedProductsToBeEdited(products);
};

export const getCachedProductsToBeEdited = async (): Promise<Product[]> => {
  const productsString = await AsyncStorage.getItem(CACHED_PRODUCTS_TO_BE_EDITED);
  if (productsString == null) {
    return [];
  }
  return JSON.parse(productsString) as Product[];
};

export const updateCachedProductsToBeEdited = async (products: Product[]): Promise<void> => {
  await AsyncStorage.setItem(CACHED_PRODUCTS_TO_BE_EDITED, JSON.stringify(products));
};

export const addToCachedProductsToBeDeleted = async (productId: Product): Promise<void> => {
  const productIds = await getCachedProductsToBeDeleted();
  productIds.push(productId);
  await updateCachedProductsToBeDeleted(productIds);
};

export const getCachedProductsToBeDeleted = async (): Promise<Product[]> => {
  const productsString = await AsyncStorage.getItem(CACHED_PRODUCTS_TO_BE_DELETED);
  if (productsString == null) {
    return [];
  }
  return JSON.parse(productsString) as Product[];
};

export const updateCachedProductsToBeDeleted = async (productIds: Product[]): Promise<void> => {
  await AsyncStorage.setItem(CACHED_PRODUCTS_TO_BE_DELETED, JSON.stringify(productIds));
};

export const addProductDelta = async (productDelta: ProductDelta): Promise<void> => {
  const productDeltas = await getProductDeltas();
  const existingDelta = productDeltas.find(delta => delta.productId === productDelta.productId);

  if (existingDelta) {
    const quantity = existingDelta.quantity + productDelta.quantity;
    const index = productDeltas.indexOf(existingDelta);
    productDeltas[index] = {...productDelta, quantity: quantity};
  } else {
    productDeltas.push(productDelta);
  }

  await updateProductDeltas(productDeltas);
};

export const getProductDeltas = async (): Promise<ProductDelta[]> => {
  const deltasString = await AsyncStorage.getItem(CACHED_PRODUCTS_AND_DELTAS);
  if (deltasString == null) {
    return [];
  }
  return JSON.parse(deltasString) as ProductDelta[]
};

export const updateProductDeltas = async (deltas: ProductDelta[]): Promise<void> => {
  await AsyncStorage.setItem(CACHED_PRODUCTS_AND_DELTAS, JSON.stringify(deltas));
};
