import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { customerApi } from "./customerApi";
import { productApi } from "./productsApi";
import { adminApi } from "./adminSlice";
import { api } from "./api";
import authSlice from "./authSlice/authSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    [api.reducerPath]: api.reducer,
    [customerApi.reducerPath]: customerApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [adminApi.reducerPath]: adminApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(productApi.middleware)
      .concat(customerApi.middleware)
      .concat(adminApi.middleware)
      .concat(api.middleware),
});

setupListeners(store.dispatch);
