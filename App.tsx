import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { useEffect, useState } from "react";
import * as Notifications from "expo-notifications";
import CountDown from "./components/CountDown";
import { intervals } from "./constants/timeIntervals";

export default function App() {
  //TODO When is final adjust for countdown in minutes, not in seconds
  const { BREAK_TIME_PERRIOD, FOCUS_TIME_PERRIOD } = intervals;

  const [appState, setAppState] = useState({
    focusTime: FOCUS_TIME_PERRIOD,
    breakTime: BREAK_TIME_PERRIOD,
    isCounting: false,
  });

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });

  useEffect(() => {
    Notifications.requestPermissionsAsync({
      ios: {
        allowAlert: true,
        allowBadge: true,
        allowSound: true,
        allowAnnouncements: true,
      },
    });

    const receivedNotificationSubscription =
      Notifications.addNotificationReceivedListener((notification) =>
        console.log("receivedNotificationSubscription", notification)
      );

    return () => {
      receivedNotificationSubscription.remove();
    };
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <CountDown state={appState} setAppState={setAppState} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
