import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";

import { useSelector } from "react-redux";
import { storeType } from "../store/store";
import { TouchableOpacity } from "react-native";
import { colors } from "../constants/colors";
import Animated, { ZoomIn, ZoomOut } from "react-native-reanimated";

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
  const isCounting = useSelector(
    (state: storeType) => state.timeIntervals.isCounting
  );

  const AnimatedTouchableOpacity =
    Animated.createAnimatedComponent(TouchableOpacity);

  return autohide ? (
    !isCounting && (
      <AnimatedTouchableOpacity
        onPress={onPress}
        entering={ZoomIn}
        exiting={ZoomOut}
      >
        <Ionicons name={name} size={40} color={colors.white} />
      </AnimatedTouchableOpacity>
    )
  ) : (
    <AnimatedTouchableOpacity
      onPress={onPress}
      entering={ZoomIn}
      exiting={ZoomOut}
    >
      <Ionicons name={name} size={40} color={colors.white} />
    </AnimatedTouchableOpacity>
  );
}

export default React.memo(ButtonComponent);
