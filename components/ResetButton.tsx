import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useDispatch, useSelector } from "react-redux";
import { TouchableOpacity } from "react-native";
import { colors } from "../constants/colors";
import { reset } from "../store/appSlice";
import { storeType } from "../store/store";

function ResetButton() {
  const { isCounting } = useSelector((state: storeType) => state.timeIntervals);
  const dispatch = useDispatch();

  return (
    !isCounting && (
      <TouchableOpacity onPress={() => dispatch(reset())}>
        <Ionicons name="reload-circle-outline" size={40} color={colors.white} />
      </TouchableOpacity>
    )
  );
}

export default ResetButton;
