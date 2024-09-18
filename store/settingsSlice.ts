import { createSlice } from "@reduxjs/toolkit";
import { newStoreIntervals } from "./appSlice";

const initialState = {
  focusTime: newStoreIntervals.focusTime,
  breakTime: newStoreIntervals.breakTime,
};

export const settingsSlice = createSlice({
  name: "settingsIntervals",
  initialState,
  reducers: {
    setNewFocusTime: (state, action) => {
      const newFocustime = action.payload;
      state.focusTime = newFocustime;
    },

    setNewBreakTime: (state, action) => {
      const newBreakTime = action.payload;
      state.breakTime = newBreakTime;
    },

    setNewSliderIntervals: (state, action) => {
      const newintervals = action.payload;
      return newintervals;
    },
  },
});

export const { setNewBreakTime, setNewFocusTime, setNewSliderIntervals } =
  settingsSlice.actions;
