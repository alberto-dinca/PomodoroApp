import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useDispatch, useSelector } from "react-redux";
import { storeType } from "../store/store";
import { TouchableOpacity } from "react-native";
import { colors } from "../constants/colors";
import { setIsCounting } from "../store/appSlice";

//TODO de creat componenta Buttom reutilizatiba pentru toate butoanele
function StartStopButton() {
  const { isCounting } = useSelector((state: storeType) => state.timeIntervals);
  const dispatch = useDispatch();
  return (
    <TouchableOpacity onPress={() => dispatch(setIsCounting())}>
      <Ionicons
        name={isCounting ? "pause-circle-outline" : "play-circle-outline"}
        size={40}
        color={colors.white}
      />
    </TouchableOpacity>
  );
}

export default StartStopButton;
