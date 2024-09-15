import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  focusTime: 25,
  breakTime: 5,
  isCounting: false,
  isPause: false,
  isFocusTimeZero: false,
};

export let newStoreIntervals = initialState;

export const intervalsSlice = createSlice({
  name: "timeIntervals",
  initialState,
  reducers: {
    setFocusTime: (state) => {
      state.focusTime = state.focusTime - 1;
    },

    setFocusTimeToZero: (state) => {
      state.isFocusTimeZero = true;
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

    reset: () => newStoreIntervals,

    updateinitialState: (state, actions) => {
      const { focusTimePerriod, breakTimePerriod } = actions.payload;
      newStoreIntervals = {
        focusTime: focusTimePerriod,
        breakTime: breakTimePerriod,
        isCounting: false,
        isPause: false,
        isFocusTimeZero: false,
      };

      return newStoreIntervals;
    },
  },
});

export const {
  setBreakTime,
  setFocusTime,
  setIsCounting,
  reset,
  setIsPause,
  updateinitialState,
  setFocusTimeToZero,
} = intervalsSlice.actions;
