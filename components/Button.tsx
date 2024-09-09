import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";

type PropType = {
  onPress: () => void;
  isCounting: boolean;
};

function ButtonComponent({ onPress, isCounting }: PropType) {
  return (
    <Ionicons
      name={isCounting ? "stop-circle-outline" : "play-circle-outline"}
      size={50}
      color="white"
      onPress={onPress}
    />
  );
}

export default ButtonComponent;
