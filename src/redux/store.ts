import { createStore } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import rootReducer from "./Reducer";
import { RootState } from "./type";

const persistConfig = {
  key: "root", // Change this key as needed
  storage,
};

const persistedReducer = persistReducer(
  persistConfig,
  rootReducer as RootState
);

const store: any = createStore(persistedReducer);
const persistor = persistStore(store);

export { store, persistor };
export type { RootState };
