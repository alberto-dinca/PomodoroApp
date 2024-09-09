import React from "react";
import { View, StyleSheet, Text, Dimensions } from "react-native";
import Svg, { Circle } from "react-native-svg";
import { intervals } from "../constants/timeIntervals";
import { colors } from "../constants/colors";
import { useDispatch, useSelector } from "react-redux";
import { storeType } from "../store/store";

type TimmerAnimationProps = {
  state: {
    focusTime: number;
    breakTime: number;
    isCounting: boolean;
  };
};

const size = Dimensions.get("window").width - 20;

function TimmerAnimation({ state }: TimmerAnimationProps) {
  const { focusTime, breakTime } = useSelector(
    (state: storeType) => state.timeIntervals
  );
  const dispatch = useDispatch();
  // const { breakTime, focusTime } = state;
  const timeLeft = focusTime > 0 ? focusTime : breakTime;
  const { BREAK_TIME_PERRIOD, FOCUS_TIME_PERRIOD } = intervals;

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
