import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useDispatch } from "react-redux";
import { TouchableOpacity, StyleSheet } from "react-native";
import { colors } from "../constants/colors";
import { reset } from "../store/appSlice";

function SettingsButton() {
  const dispatch = useDispatch();

  return (
    <TouchableOpacity onPress={() => dispatch(reset())}>
      <Ionicons name="list-circle-outline" size={40} color={colors.white} />
    </TouchableOpacity>
  );
}

export default SettingsButton;
