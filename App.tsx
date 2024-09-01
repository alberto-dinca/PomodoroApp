import { StatusBar } from "expo-status-bar";
import {
  Alert,
  Button,
  Dimensions,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useEffect, useState } from "react";
import * as Notifications from "expo-notifications";

export default function App() {
  //Notifications
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });

  useEffect(() => {
    //Request notifications permissions
    Notifications.requestPermissionsAsync({
      ios: {
        allowAlert: true,
        allowBadge: true,
        allowSound: true,
        allowAnnouncements: true,
      },
    });

    //Add notifications event listener
    const receivedNotificationSubscription =
      Notifications.addNotificationReceivedListener((notification) =>
        console.log("receivedNotificationSubscription", notification)
      );
    const responseNotificationSubscription =
      Notifications.addNotificationResponseReceivedListener((response) =>
        console.log("responseNotificationSubscription", response)
      );

    return () => {
      receivedNotificationSubscription.remove();
      responseNotificationSubscription.remove();
    };
  }, []);

  const scheduleNotifications = async (title: string, body: string) => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: title,
        body: body,
      },
      trigger: null,
    });
  };

  //Countdown
  //TODO When is final adjust for countdown in minutes, not in seconds
  const FOCUS_TIME_PERRIOD = 5; /* 25 * 60 */
  const BREAK_TIME_PERRIOD = 3; /* 5 * 60; */
  const [focusTime, setFocusTime] = useState(FOCUS_TIME_PERRIOD);
  const [breakTime, setBreakTime] = useState(BREAK_TIME_PERRIOD);
  const [isCounting, setIsCounting] = useState(false);

  const { width: iconSize } = Dimensions.get("window");

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
        //TODO Refactoring
        if (focusTime === 0) {
          if (breakTime === 0) {
            scheduleNotifications(
              "Pomodoro finalizat",
              "Ati finalizat o sesiune Pomodoro"
            );

            clearInterval(interval);
            setIsCounting(false);
            setBreakTime(BREAK_TIME_PERRIOD);
            setFocusTime(FOCUS_TIME_PERRIOD);
            return;
          }
          if (focusTime === 0 && breakTime === BREAK_TIME_PERRIOD) {
            scheduleNotifications("Pauza", "Este timpul sa luati o pauza");
          }
          setBreakTime((prev) => prev - 1);
          return;
        }

        setFocusTime((prev) => prev - 1);
      };

      const interval = setInterval(() => countDown(), 1000);

      return () => clearInterval(interval);
    }
  }, [isCounting, focusTime, breakTime]);

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: focusTime === 0 ? "green" : "orangered" },
      ]}
    >
      {<StatusBar style="light" />}
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
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "orangered",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "800",
  },
});
