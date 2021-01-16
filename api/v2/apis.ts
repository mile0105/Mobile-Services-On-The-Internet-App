import {gretch} from "gretchen";
import {LIST_WAREHOUSES_URL} from "../../constants/APIConstants";
import {authorizationHeader, contentType} from "../apis";
import {Warehouse} from "./models";


export const fetchAllWarehouses = async (): Promise<Warehouse[]> => {
  const authorization = await authorizationHeader();

  const {data, error} = await gretch<Warehouse[]>(LIST_WAREHOUSES_URL, {
    method: 'GET',
    headers: Object.assign({...contentType, ...authorization}),
  }).json();

  if (error) {
    throw error
  }

  const warehouses: Warehouse[] = [];

  if(!data) {
    return [];
  }

  for (let warehouse of data) {
    warehouses.push(
      {
        id: warehouse.id,
        name: warehouse.name,
        products: warehouse.products.sort((a, b) => (a.id < b.id) ? 1 : -1)
      } as Warehouse
    );
  }
  return warehouses;
};



