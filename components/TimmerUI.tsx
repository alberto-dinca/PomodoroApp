import React from "react";
import { View, StyleSheet, Text, Dimensions } from "react-native";
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
function TimmerUI({ state }: PropType) {
  const { breakTime, focusTime } = state;
  return (
    <>
      <Text style={styles.title}>{focusTime > 0 ? "Lucreaza" : "Pauza"}</Text>
      <View style={styles.container}>
        <Text style={styles.text}>{focusTime > 0 ? focusTime : breakTime}</Text>
      </View>
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
