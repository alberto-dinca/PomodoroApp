import React from "react";
import { View, StyleSheet, Text, Dimensions } from "react-native";
import { colors } from "../constants/colors";
import ButtonComponent from "./Button";
type PropType = {
  focusTime: number;
  breakTime: number;
  onPress: () => void;
  isCounting: boolean;
  setIsCounting: React.Dispatch<React.SetStateAction<boolean>>;
};
const size = Dimensions.get("window").width - 20;
function TimmerUI({
  focusTime,
  breakTime,
  onPress,
  isCounting,
  setIsCounting,
}: PropType) {
  return (
    <>
      <Text style={styles.title}>
        {focusTime > 0 ? "Focus Time" : "Break Time"}
      </Text>
      <View style={styles.container}>
        <Text style={styles.text}>{focusTime > 0 ? focusTime : breakTime}</Text>
      </View>
      <ButtonComponent
        onPress={onPress}
        isCounting={isCounting}
        setIsCounting={setIsCounting}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    width: size - 50,
    height: size - 50,
    borderRadius: (size - 20) / 2,
    borderWidth: 10,
    borderColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  text: {
    fontSize: 60,
    fontWeight: "800",
    color: "#fff",
  },
  title: {
    fontSize: 40,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 20,
  },
});

export default TimmerUI;
