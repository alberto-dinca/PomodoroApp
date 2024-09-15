import React, { useEffect } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import Svg, { Circle } from "react-native-svg";
import { colors } from "../constants/colors";
import { useDispatch, useSelector } from "react-redux";
import { storeType } from "../store/store";
import {
  newStoreIntervals,
  setBreakTime,
  setFocusTime,
} from "../store/appSlice";
import { displayNotification } from "../utils/displayNotifications";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

const size = Dimensions.get("window").width - 20;

function TimmerAnimation() {
  const { breakTime: breakTimePerriod, focusTime: focusTimePerriod } =
    newStoreIntervals;

  const { focusTime, breakTime, isCounting } = useSelector(
    (state: storeType) => state.timeIntervals
  );
  const dispatch = useDispatch();

  const timeLeft = focusTime > 0 ? focusTime : breakTime;

  const radius = size / 2 - 20;
  const circumference = 2 * Math.PI * radius;
  const progress =
    focusTime > 0 ? timeLeft / focusTimePerriod : timeLeft / breakTimePerriod;
  const strokeDashoffset = circumference * (1 - progress);

  const countDown = () => {
    if (focusTime !== 0) {
      dispatch(setFocusTime());
    } else {
      dispatch(setBreakTime());
    }
  };

  const scale = useSharedValue(1);

  useEffect(() => {
    scale.value = withSpring(1.2, {}, () => {
      scale.value = withSpring(1);
    });
  }, [timeLeft]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  useEffect(() => {
    if (isCounting) {
      displayNotification();
      const interval = setInterval(() => countDown(), 60000);
      return () => clearInterval(interval);
    }
  }, [isCounting, focusTime, breakTime]);

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
      <Animated.Text style={[styles.text, animatedStyle]}>
        {timeLeft} min
      </Animated.Text>
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
