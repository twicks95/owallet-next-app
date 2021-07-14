import { useMemo } from "react";
import { persistReducer, persistStore } from "redux-persist";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import logger from "redux-logger";
import rootReducer from "./reducer";
import storage from "redux-persist/lib/storage";
import promiseMiddleware from "redux-promise-middleware";

let store;

const persistConfig = {
  key: "primary",
  storage,
  whitelist: ["userData"], // place to select which state you want to persist
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const clientStore = createStore(
  persistedReducer,
  applyMiddleware(promiseMiddleware, logger)
);
export const persistor = persistStore(clientStore);

function initStore(preloadedState = {}) {
  return createStore(
    persistedReducer,
    preloadedState,
    composeWithDevTools(applyMiddleware(promiseMiddleware, logger))
  );
}

export const initializeStore = (preloadedState) => {
  let _store = store ?? initStore(preloadedState);

  // After navigating to a page with an initial Redux state, merge that state
  // with the current state in the store, and create a new store
  if (preloadedState && store) {
    _store = initStore({
      ...store.getState(),
      ...preloadedState,
    });
    // Reset the current store
    store = undefined;
  }

  // For SSG and SSR always create a new store
  if (typeof window === "undefined") return _store;
  // Create the store once in the client
  if (!store) store = _store;

  return _store;
};

export function useStore(initialState) {
  const store = useMemo(() => initializeStore(initialState), [initialState]);
  return store;
}
