import React from "react";
import { Button, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

type PropType = {
  onPress: () => void;
  isCounting: boolean;
  setIsCounting: React.Dispatch<React.SetStateAction<boolean>>;
};

function ButtonComponent({ onPress, isCounting, setIsCounting }: PropType) {
  return (
    <Ionicons
      name={isCounting ? "stop-circle-outline" : "play-circle-outline"}
      size={50}
      color="white"
      onPress={onPress}
    />
  );
}

const styles = StyleSheet.create({
  btn: {
    width: "70%",
  },
});

export default ButtonComponent;
