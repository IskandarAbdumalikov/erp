import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { customerApi } from "./customerApi";
import { productApi } from "./productsApi";
import { adminApi } from "./adminSlice";
import { api } from "./api";
import authSlice from "./authSlice/authSlice";
import { paymentApi } from "./paymentApi";
import { profileApi } from "./profileApi";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    [api.reducerPath]: api.reducer,
    [customerApi.reducerPath]: customerApi.reducer,
    [profileApi.reducerPath]: profileApi.reducer,
    [paymentApi.reducerPath]: paymentApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [adminApi.reducerPath]: adminApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(productApi.middleware)
      .concat(profileApi.middleware)
      .concat(paymentApi.middleware)
      .concat(customerApi.middleware)
      .concat(adminApi.middleware)
      .concat(api.middleware),
});

setupListeners(store.dispatch);
