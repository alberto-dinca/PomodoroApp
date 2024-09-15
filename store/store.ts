import { configureStore } from "@reduxjs/toolkit";
import { intervalsSlice } from "./appSlice";
import { settingsSlice } from "./settingsSlice";

export type storeType = {
  timeIntervals: {
    focusTime: number;
    breakTime: number;
    isCounting: boolean;
    isPause: boolean;
    isFocusTimeZero: boolean;
  };
  newIntervals: {
    focusTime: number;
    breakTime: number;
    isModalVisible: boolean;
  };
};

export const store = configureStore({
  reducer: {
    timeIntervals: intervalsSlice.reducer,
    newIntervals: settingsSlice.reducer,
  },
});
