import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";

import cartReducer from "./features/counter/cartSlice";
import userSliceReducer from "./features/counter/userSlice";
import rodalSlice from "./features/counter/rodalSlice";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage/session";
// eslint-disable-next-line
import { getDefaultMiddleware } from "@reduxjs/toolkit";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  user: userSliceReducer,
  cart: cartReducer,
  rodal: rodalSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

const persistor = persistStore(store);

export { store, persistor };
