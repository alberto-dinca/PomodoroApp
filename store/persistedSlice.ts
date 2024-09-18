import { createSlice } from "@reduxjs/toolkit";
import { newStoreIntervals } from "./appSlice";

const initialState = {
  focusTimePerriod: newStoreIntervals.focusTime,
  breakTimePerriod: newStoreIntervals.breakTime,
};

export const persistedSlice = createSlice({
  name: "persistedIntervals",
  initialState,
  reducers: {
    setPersistedIntervals: (state, action) => {
      const newIntervals = action.payload;

      return newIntervals;
    },
  },
});

export const { setPersistedIntervals } = persistedSlice.actions;
