import { combineReducers, configureStore } from "@reduxjs/toolkit";

import { setupListeners } from "@reduxjs/toolkit/query";

import { productsAPI } from "./services/products";
import { cartSlice } from "./slices/cart";
import { authSlice } from "./slices/auth";

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

const apis = [productsAPI];

const slices = [cartSlice, authSlice];

export const store = configureStore({
  reducer: {
    ...apis.reduce(
      (acc, api) => ({ ...acc, [api.reducerPath]: api.reducer }),
      {},
    ),
    ...slices.reduce(
      (acc, slice) => ({ ...acc, [slice.name]: slice.reducer }),
      {},
    ),
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apis.map((api) => api.middleware)),
});

store.asyncReducers = {};

apis.forEach((api) => {
  store.asyncReducers[api.reducerPath] = api.reducer;
});

slices.forEach((slice) => {
  store.asyncReducers[slice.name] = slice.reducer;
});

const createReducerInjector = () => {
  const injectReducer = (key, asyncSlice) => {
    slices.push(asyncSlice);
    store.asyncReducers[key] = asyncSlice.reducer;
    store.replaceReducer(
      combineReducers({
        ...store.asyncReducers,
      }),
    );
  };

  return injectReducer;
};

const createAPIInjector = () => {
  const injectAPI = (key, asyncAPI) => {
    apis.push(asyncAPI);
    store.asyncReducers[key] = asyncAPI.reducer;
    store.replaceReducer(
      combineReducers({
        ...store.asyncReducers,
      }),
    );
  };

  return injectAPI;
};

export const reducerInjector = createReducerInjector();
export const APIInjector = createAPIInjector();

setupListeners(store.dispatch);
