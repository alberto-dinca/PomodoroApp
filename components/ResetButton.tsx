import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useDispatch } from "react-redux";
import { TouchableOpacity } from "react-native";
import { colors } from "../constants/colors";
import { reset } from "../store/appSlice";

function ResetButton() {
  const dispatch = useDispatch();

  return (
    <TouchableOpacity onPress={() => dispatch(reset())}>
      <Ionicons name="reload-circle-outline" size={40} color={colors.white} />
    </TouchableOpacity>
  );
}

export default ResetButton;
