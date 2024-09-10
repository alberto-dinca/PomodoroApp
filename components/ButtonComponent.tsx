import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useDispatch, useSelector } from "react-redux";
import { storeType } from "../store/store";
import { TouchableOpacity } from "react-native";
import { colors } from "../constants/colors";
import { setIsCounting } from "../store/appSlice";

type ButtonComponentProps = {
  onPress: () => void;
  name:
    | "pause-circle-outline"
    | "play-circle-outline"
    | "reload-circle-outline"
    | "list-circle-outline";
  autohide?: boolean;
};

function ButtonComponent({ onPress, name, autohide }: ButtonComponentProps) {
  const { isCounting } = useSelector((state: storeType) => state.timeIntervals);
  const dispatch = useDispatch();
  return autohide ? (
    !isCounting && (
      <TouchableOpacity onPress={onPress}>
        <Ionicons name={name} size={40} color={colors.white} />
      </TouchableOpacity>
    )
  ) : (
    <TouchableOpacity onPress={onPress}>
      <Ionicons name={name} size={40} color={colors.white} />
    </TouchableOpacity>
  );
}

export default ButtonComponent;
