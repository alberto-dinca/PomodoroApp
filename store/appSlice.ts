import { createSlice } from "@reduxjs/toolkit";
import { intervals } from "../constants/timeIntervals";

const initialState = {
  focusTime: intervals.FOCUS_TIME_PERRIOD,
  breakTime: intervals.BREAK_TIME_PERRIOD,
  isCounting: false,
  isPause: false,
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

    setIsPause: (state) => {
      state.isPause = !state.isPause;
    },

    reset: () => initialState,
  },
});

export const { setBreakTime, setFocusTime, setIsCounting, reset, setIsPause } =
  intervalsSlice.actions;
