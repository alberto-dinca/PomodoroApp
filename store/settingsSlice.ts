import { createSlice } from "@reduxjs/toolkit";
import { newStoreIntervals } from "./appSlice";

const initialState = {
  focusTime: newStoreIntervals.focusTime,
  breakTime: newStoreIntervals.breakTime,
  isModalVisible: false,
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

    setIsModalVisible: (state, action) => {
      const modalState = action.payload;
      state.isModalVisible = modalState;
    },
  },
});

export const { setNewBreakTime, setNewFocusTime, setIsModalVisible } =
  settingsSlice.actions;
