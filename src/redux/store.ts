import {
  combineReducers,
  configureStore,
  Middleware,
  Reducer,
  Slice,
  Store,
} from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { productsAPI } from "./services/products";
import { cartSlice } from "./slices/cart";
import { authSlice } from "./slices/auth";

interface CustomStore extends Store {
  asyncReducers: Record<string, Reducer>;
}

const apis = [productsAPI];
const slices = [cartSlice, authSlice];

const makeStore = () => {
  const initialReducers = {
    ...apis.reduce(
      (acc, api) => ({ ...acc, [api.reducerPath]: api.reducer }),
      {} as Record<string, Reducer>,
    ),
    ...slices.reduce(
      (acc, slice) => ({ ...acc, [slice.name]: slice.reducer }),
      {} as Record<string, Reducer>,
    ),
  };

  const store = configureStore({
    reducer: initialReducers,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: ["persist/PERSIST"],
        },
      }).concat(productsAPI.middleware as Middleware),
  }) as CustomStore;

  store.asyncReducers = initialReducers;
  return store;
};

export const store = makeStore();

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

const createReducerInjector = () => {
  const injectReducer = <T>(key: string, asyncSlice: Slice<T>) => {
    store.asyncReducers[key] = asyncSlice.reducer;
    store.replaceReducer(combineReducers(store.asyncReducers));
  };

  return injectReducer;
};

const createAPIInjector = () => {
  const injectAPI = (key: string, asyncAPI: typeof productsAPI) => {
    store.asyncReducers[key] = asyncAPI.reducer;
    store.replaceReducer(combineReducers(store.asyncReducers));
  };

  return injectAPI;
};

export const reducerInjector = createReducerInjector();
export const APIInjector = createAPIInjector();

setupListeners(store.dispatch);
