import { StatusBar } from "expo-status-bar";
import { Alert, Dimensions, StyleSheet, Text, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useEffect, useState } from "react";

export default function App() {
  //TODO When is final adjust for countdown in minutes, not in seconds
  const FOCUS_TIME_PERRIOD = 3; /* 25 * 60 */
  const BREAK_TIME_PERRIOD = 2; /* 5 * 60; */
  const [focusTime, setFocusTime] = useState(FOCUS_TIME_PERRIOD);
  const [breakTime, setBreakTime] = useState(BREAK_TIME_PERRIOD);
  const [isCounting, setIsCounting] = useState(false);

  console.log("🚀 ~ App ~ focusTime:", focusTime);

  const { width: iconSize } = Dimensions.get("window");

  const startTimmer = () => {
    setIsCounting(true);
  };

  useEffect(() => {
    if (isCounting) {
      const countDown = () => {
        //TODO Clean code Ex: IF focus time && ...
        if (focusTime === 0) {
          console.log("focustime === 0");
          if (breakTime === 0) {
            clearInterval(interval);
            setIsCounting(false);
            setBreakTime(BREAK_TIME_PERRIOD);
            setFocusTime(FOCUS_TIME_PERRIOD);
            return Alert.alert(
              "Pomodoro Successfull",
              "Congratilation! You finish a Pomodoro perriod!"
            );
          }

          setBreakTime((prev) => prev - 1);
          return;
        }
        console.log("focustime !== 0");

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
      <Text style={styles.text}>
        {focusTime > 0 ? "Focus time" : "Break time"}
      </Text>
      <Ionicons
        name="play-circle-outline"
        size={iconSize}
        color="white"
        onPress={() => {
          console.log("pressed");
          startTimmer();
        }}
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
