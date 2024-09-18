import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { intervalsSlice } from "./appSlice";
import { settingsSlice } from "./settingsSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistedSlice } from "./persistedSlice";
import { persistReducer } from "redux-persist";
import persistStore from "redux-persist/es/persistStore";

export type storeType = {
  timeIntervals: {
    focusTime: number;
    breakTime: number;
    isCounting: boolean;
    isPause: boolean;
    isFocusTimeZero: boolean;
    modalVisible: false;
  };
  newIntervals: {
    focusTime: number;
    breakTime: number;
  };
  persistedIntervals: {
    focusTimePerriod: number;
    breakTimePerriod: number;
  };
};

const persistConfig = {
  key: "persisted",
  storage: AsyncStorage,
  whitelist: ["persistedIntervals", "newIntervals"],
};

const rootReducer = combineReducers({
  timeIntervals: intervalsSlice.reducer,
  newIntervals: settingsSlice.reducer,
  persistedIntervals: persistedSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"],
      },
    }),
});

export const persistor = persistStore(store);
