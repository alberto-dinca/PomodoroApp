import React from "react";
import { View, StyleSheet, Text } from "react-native";
import Slider from "@react-native-community/slider";
import { colors } from "../constants/colors";
import { useDispatch, useSelector } from "react-redux";
import { storeType } from "../store/store";
import { setNewBreakTime, setNewFocusTime } from "../store/settingsSlice";

type SliderComponentProps = {
  interval: "focusTime" | "breakTime";
  title: string;
  btnIsdisabled: () => void;
  isLongInterval: boolean;
};

function SliderComponent({
  interval,
  title,
  btnIsdisabled,
  isLongInterval,
}: SliderComponentProps) {
  const { breakTime, focusTime } = useSelector(
    (state: storeType) => state.newIntervals
  );
  const dispatch = useDispatch();

  const onValueChange = (value: number) => {
    dispatch(
      interval === "focusTime" ? setNewFocusTime(value) : setNewBreakTime(value)
    );
  };

  const currentValue = () => {
    if (interval === "focusTime") {
      return focusTime;
    } else return breakTime;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.sliderContainer}>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={isLongInterval ? 600 : 120}
          minimumTrackTintColor={colors.blue}
          maximumTrackTintColor={colors.darkGray}
          thumbTintColor={colors.blue}
          value={currentValue()}
          step={isLongInterval ? 5 : 1}
          lowerLimit={5}
          onValueChange={(value) => onValueChange(value)}
          onSlidingComplete={() => btnIsdisabled()}
        />
        <Text style={styles.text}>{currentValue()} min</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
  },
  sliderContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    width: "100%",
  },
  slider: {
    flex: 1,
    height: 40,
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
  },
});

export default SliderComponent;
