import { configureStore } from "@reduxjs/toolkit";
import { intervalsSlice } from "./appSlice";

export type storeType = {
  timeIntervals: {
    focusTime: number;
    breakTime: number;
    isCounting: boolean;
  };
};

export const store = configureStore({
  reducer: {
    timeIntervals: intervalsSlice.reducer,
  },
});
