import {Product} from "../models";

export interface Warehouse {
  id: number,
  name: string,
  products: Product[]
}
