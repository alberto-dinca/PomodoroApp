import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useDispatch, useSelector } from "react-redux";
import { storeType } from "../store/store";
import { TouchableOpacity } from "react-native";
import { colors } from "../constants/colors";
import { startTimmer } from "../store/appSlice";

function ButtonComponent() {
  const { isCounting } = useSelector((state: storeType) => state.timeIntervals);
  const dispatch = useDispatch();
  return (
    <TouchableOpacity onPress={() => dispatch(startTimmer())}>
      <Ionicons
        name={isCounting ? "stop-circle-outline" : "play-circle-outline"}
        size={50}
        color={colors.white}
      />
    </TouchableOpacity>
  );
}

export default ButtonComponent;
