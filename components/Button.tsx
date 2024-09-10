import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useSelector } from "react-redux";
import { storeType } from "../store/store";
import { TouchableOpacity } from "react-native";
import { colors } from "../constants/colors";

type ButtonComponentProps = {
  onPress: () => void;
};

function ButtonComponent({ onPress }: ButtonComponentProps) {
  const { isCounting } = useSelector((state: storeType) => state.timeIntervals);
  return (
    <TouchableOpacity onPress={onPress}>
      <Ionicons
        name={isCounting ? "stop-circle-outline" : "play-circle-outline"}
        size={50}
        color={colors.white}
      />
    </TouchableOpacity>
  );
}

export default ButtonComponent;
