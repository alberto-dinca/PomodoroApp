import React, { useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import * as Notifications from "expo-notifications";
import { intervals } from "../constants/timeIntervals";
import { colors } from "../constants/colors";
import ButtonComponent from "./Button";
import TimmerAnimation from "./TimmerAnimation";
import { useDispatch, useSelector } from "react-redux";
import {
  reset,
  setBreakTime,
  setFocusTime,
  setIsCounting,
} from "../store/appSlice";
import { storeType } from "../store/store";

type CountDownProps = {
  state: {
    focusTime: number;
    breakTime: number;
    isCounting: boolean;
  };
  setAppState: React.Dispatch<
    React.SetStateAction<{
      focusTime: number;
      breakTime: number;
      isCounting: boolean;
    }>
  >;
};

function CountDown({ state, setAppState }: CountDownProps) {
  const { BREAK_TIME_PERRIOD, FOCUS_TIME_PERRIOD } = intervals;
  const { focusTime, breakTime, isCounting } = useSelector(
    (state: storeType) => state.timeIntervals
  );
  const dispatch = useDispatch();

  console.log("🚀 ~ CountDown ~ store:", focusTime, breakTime, isCounting);

  const scheduleNotifications = async (title: string, body: string) => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: title,
        body: body,
      },
      trigger: null,
    });
  };

  const startTimmer = () => {
    if (!isCounting) {
      // setAppState({ ...state, isCounting: true });
      dispatch(setIsCounting());
      return;
    }
    dispatch(reset());
  };

  const displayNotification = () => {
    if (focusTime === 0 && breakTime === BREAK_TIME_PERRIOD) {
      scheduleNotifications("Pauza", "Este timpul sa luati o pauza");
    } else if (breakTime === 0) {
      scheduleNotifications(
        "Pomodoro finalizat",
        "Ati finalizat o sesiune Pomodoro"
      );
      dispatch(reset());
    }
  };

  const countDown = () => {
    if (focusTime !== 0) {
      // setAppState({ ...state, focusTime: focusTime - 1 });
      dispatch(setFocusTime());
    } else {
      // setAppState({ ...state, breakTime: breakTime - 1 });
      dispatch(setBreakTime());
    }
  };

  useEffect(() => {
    if (isCounting) {
      displayNotification();
      const interval = setInterval(() => countDown(), 1000);
      return () => clearInterval(interval);
    }
  }, [isCounting, focusTime, breakTime]);

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor:
            focusTime > 0 ? colors.focusColos : colors.breakColor,
        },
      ]}
    >
      <Text style={styles.title}>{focusTime > 0 ? "Lucreaza" : "Pauza"}</Text>
      <TimmerAnimation state={state} />
      <ButtonComponent isCounting={isCounting} onPress={startTimmer} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "orangered",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 40,
    fontWeight: "700",
    color: colors.white,
    marginBottom: 20,
  },
});

export default CountDown;
