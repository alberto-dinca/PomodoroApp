import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { useEffect } from "react";
import * as Notifications from "expo-notifications";
import CountDown from "./components/CountDown";
import { Provider } from "react-redux";
import { store } from "./store/store";

export default function App() {
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
    <Provider store={store}>
      <View style={styles.container}>
        <StatusBar style="light" />
        <CountDown />
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
