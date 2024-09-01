import React, { useEffect } from "react";
import { View, StyleSheet, Text, Dimensions } from "react-native";
import * as Notifications from "expo-notifications";
import Ionicons from "@expo/vector-icons/Ionicons";
import { intervals } from "../constants/timeIntervals";
import TimmerUI from "./TimmerUI";
import { colors } from "../constants/colors";

type PropsType = {
  focusTime: number;
  breakTime: number;
  isCounting: boolean;
  setFocusTime: React.Dispatch<React.SetStateAction<number>>;
  setBreakTime: React.Dispatch<React.SetStateAction<number>>;
  setIsCounting: React.Dispatch<React.SetStateAction<boolean>>;
};

function CountDown({
  focusTime,
  breakTime,
  isCounting,
  setFocusTime,
  setBreakTime,
  setIsCounting,
}: PropsType) {
  const { width: iconSize } = Dimensions.get("window");
  const { BREAK_TIME_PERRIOD, FOCUS_TIME_PERRIOD } = intervals;

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
      setIsCounting(true);
      return;
    }

    setIsCounting(false);
    setBreakTime(BREAK_TIME_PERRIOD);
    setFocusTime(FOCUS_TIME_PERRIOD);
  };

  useEffect(() => {
    if (isCounting) {
      const countDown = () => {
        if (focusTime !== 0) {
          setFocusTime((prev) => prev - 1);
        } else {
          if (breakTime === BREAK_TIME_PERRIOD) {
            scheduleNotifications("Pauza", "Este timpul sa luati o pauza");
            setBreakTime((prev) => prev - 1);
          } else if (breakTime === 0) {
            scheduleNotifications(
              "Pomodoro finalizat",
              "Ati finalizat o sesiune Pomodoro"
            );

            clearInterval(interval);
            setIsCounting(false);
            setBreakTime(BREAK_TIME_PERRIOD);
            setFocusTime(FOCUS_TIME_PERRIOD);
          } else {
            setBreakTime((prev) => prev - 1);
          }
        }
      };

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
      <TimmerUI
        focusTime={focusTime}
        breakTime={breakTime}
        onPress={startTimmer}
        isCounting={isCounting}
        setIsCounting={setIsCounting}
      />
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
});

export default CountDown;

/* return (
    <View
      style={[
        styles.container,
        { backgroundColor: focusTime === 0 ? "green" : "orangered" },
      ]}
    >
      <Text style={styles.text}>
        {focusTime > 0 ? "Focus time" : "Break time"}
      </Text>
      <Ionicons
        name={isCounting ? "stop-circle-outline" : "play-circle-outline"}
        size={iconSize}
        color="white"
        onPress={() => startTimmer()}
      />
      <Text style={styles.text}>{focusTime > 0 ? focusTime : breakTime}</Text>
    </View>
  );
} */
