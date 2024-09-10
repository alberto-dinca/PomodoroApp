import { createSlice } from "@reduxjs/toolkit";
import { intervals } from "../constants/timeIntervals";

const initialState = {
  focusTime: intervals.FOCUS_TIME_PERRIOD,
  breakTime: intervals.BREAK_TIME_PERRIOD,
  isCounting: false,
};

export const intervalsSlice = createSlice({
  name: "timeIntervals",
  initialState,
  reducers: {
    setFocusTime: (state) => {
      state.focusTime = state.focusTime - 1;
    },

    setBreakTime: (state) => {
      state.breakTime = state.breakTime - 1;
    },

    setIsCounting: (state) => {
      state.isCounting = !state.isCounting;
    },

    reset: () => initialState,

    startTimmer: (state) => {
      if (!state.isCounting) {
        state.isCounting = true;
      } else return initialState;
    },
  },
});

export const { setBreakTime, setFocusTime, setIsCounting, reset, startTimmer } =
  intervalsSlice.actions;
