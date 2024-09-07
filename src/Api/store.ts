import { MusaPayApi } from "./services";
import { configureStore } from "@reduxjs/toolkit";
// Or from '@reduxjs/toolkit/query/react'
import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
  reducer: {
    [MusaPayApi.reducerPath]: MusaPayApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(MusaPayApi.middleware),
});
setupListeners(store.dispatch);
