import React from "react";
import { View, StyleSheet, Text, Dimensions } from "react-native";
import Svg, { Circle } from "react-native-svg";
import { colors } from "../constants/colors";
import { useSelector } from "react-redux";
import { storeType } from "../store/store";
import { newStoreIntervals } from "../store/appSlice";

const size = Dimensions.get("window").width - 20;

function TimmerAnimation() {
  const { focusTime, breakTime } = useSelector(
    (state: storeType) => state.timeIntervals
  );
  const timeLeft = focusTime > 0 ? focusTime : breakTime;
  const { breakTime: breakTimePerriod, focusTime: focusTimePerriod } =
    newStoreIntervals;

  const radius = size / 2 - 20;
  const circumference = 2 * Math.PI * radius;
  const progress =
    focusTime > 0 ? timeLeft / focusTimePerriod : timeLeft / breakTimePerriod;
  const strokeDashoffset = circumference * (1 - progress);

  return (
    <View style={styles.container}>
      <Svg width={size} height={size}>
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={colors.white}
          strokeWidth="15"
          fill="none"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={colors.blue}
          strokeWidth="15"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </Svg>
      <Text style={styles.text}>{timeLeft} min</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 60,
    fontWeight: "800",
    color: colors.white,
    position: "absolute",
  },
});

export default TimmerAnimation;
