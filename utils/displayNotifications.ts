import { store } from "../store/store";
import {
  newStoreIntervals,
  reset,
  setFocusTimeToZero,
  setIsCounting,
  setIsPause,
} from "../store/appSlice";
import * as Notifications from "expo-notifications";

const scheduleNotifications = async (title: string, body: string) => {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: title,
      body: body,
    },
    trigger: null,
  });
};

export function displayNotification() {
  const { breakTime: breakTimePerriod } = newStoreIntervals;
  const { focusTime, breakTime, isPause } = store.getState().timeIntervals;
  const dispatch = store.dispatch;

  if (!isPause && focusTime === 0 && breakTime === breakTimePerriod) {
    scheduleNotifications("Pauza", "Este timpul sa luati o pauza");
    dispatch(setIsPause());
    dispatch(setIsCounting());
    dispatch(setFocusTimeToZero());
  } else if (breakTime === 0) {
    scheduleNotifications(
      "Pomodoro finalizat",
      "Ati finalizat o sesiune Pomodoro"
    );
    dispatch(reset());
  }
}
