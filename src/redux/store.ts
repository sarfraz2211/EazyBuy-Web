import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./authSlice";
import cartReducer from "./cartSlice";

import storage from "redux-persist/lib/storage";

import {
  persistReducer,
  persistStore,
} from "redux-persist";

import { baseApi } from "@/src/services/baseApi";

const authPersistConfig = {

  key: "auth",

  storage,
};

const persistedAuthReducer =
  persistReducer(
    authPersistConfig,
    authReducer
  );

const persistedCartReducer = persistReducer(
  { key: "cart", storage },
  cartReducer
);

export const store =
  configureStore({

    reducer: {

      auth:
        persistedAuthReducer,

      cart: persistedCartReducer,

      [baseApi.reducerPath]:
        baseApi.reducer,
    },

    middleware:
      getDefaultMiddleware =>

        getDefaultMiddleware({

          serializableCheck: false,

        }).concat(
          baseApi.middleware
        ),
  });

export const persistor = persistStore(store);

export type RootState = ReturnType< typeof store.getState >;

export type AppDispatch = typeof store.dispatch;
