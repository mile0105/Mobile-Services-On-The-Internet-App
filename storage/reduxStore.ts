import {configureStore} from "@reduxjs/toolkit";
import reducer, {AppState} from "../reducer/warehouseReducer";

const store = configureStore<AppState>({reducer: reducer });

export default store;
