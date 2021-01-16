import {Warehouse} from "../api/v2/models";
import {createSlice} from "@reduxjs/toolkit";

export interface AppState {
  warehouses: Warehouse[],
  selectedWarehouseId: number,
}

const initialState = {warehouses: [], selectedWarehouseId: 1} as AppState;

const warehouseSlice = createSlice(
  {
    name: 'warehouse',
    initialState,
    reducers: {
      setWarehouses(state: AppState, action: any) {
        if (action.payload) {
          state.warehouses = action.payload
        }
      },
      setSelectedWarehouseId(state: AppState, action: any) {
        if (action.payload) {
          state.selectedWarehouseId = action.payload;
        }
      }

    }
  }
);

const {actions, reducer} = warehouseSlice;

export const {
  setWarehouses,
  setSelectedWarehouseId
} = actions;

export default reducer;
