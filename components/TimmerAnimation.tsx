import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, Dimensions } from "react-native";
import Svg, { Circle } from "react-native-svg";
import { intervals } from "../constants/timeIntervals";
import { colors } from "../constants/colors";

type PropType = {
  state: {
    focusTime: number;
    breakTime: number;
    isCounting: boolean;
  };
  onPress: () => void;
  setAppState: React.Dispatch<
    React.SetStateAction<{
      focusTime: number;
      breakTime: number;
      isCounting: boolean;
    }>
  >;
};

const size = Dimensions.get("window").width - 20;

function TimmerAnimation({ state }: PropType) {
  const { BREAK_TIME_PERRIOD, FOCUS_TIME_PERRIOD } = intervals;
  const { breakTime, focusTime } = state;
  const timeLeft = focusTime > 0 ? focusTime : breakTime;

  const radius = size / 2 - 20;
  const circumference = 2 * Math.PI * radius;
  const progress =
    focusTime > 0
      ? timeLeft / FOCUS_TIME_PERRIOD
      : timeLeft / BREAK_TIME_PERRIOD;
  const strokeDashoffset = circumference * (1 - progress);

  return (
    <View style={styles.container}>
      <Svg width={size} height={size}>
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#fff"
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
      <Text style={styles.text}>{timeLeft} sec</Text>
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
    color: "#fff",
    position: "absolute",
  },
  title: {
    fontSize: 40,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 20,
  },
});

export default TimmerAnimation;
