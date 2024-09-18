import React, { useCallback, useRef } from "react";
import { View, StyleSheet, Text } from "react-native";
import { colors } from "../constants/colors";
import TimmerAnimation from "./TimmerAnimation";
import { useDispatch, useSelector } from "react-redux";
import { displayModal, reset, setIsCounting } from "../store/appSlice";
import { storeType } from "../store/store";
import ButtonComponent from "./ButtonComponent";
import ModalComponent from "./ModalComponent";
import BottomSheet from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";

function CountDown() {
  const isCounting = useSelector(
    (state: storeType) => state.timeIntervals.isCounting
  );

  const isFocusTimeZero = useSelector(
    (state: storeType) => state.timeIntervals.isFocusTimeZero
  );

  const dispatch = useDispatch();

  const bottomSheetRef = useRef<BottomSheet>(null);

  const openModal = useCallback(() => {
    dispatch(displayModal(true));
  }, []);
  const handleReset = useCallback(() => dispatch(reset()), []);
  const handleStartCounting = useCallback(() => dispatch(setIsCounting()), []);

  return (
    <GestureHandlerRootView>
      <View
        style={[
          styles.container,
          {
            backgroundColor: !isFocusTimeZero
              ? colors.focusColos
              : colors.breakColor,
          },
        ]}
      >
        <Text style={styles.title}>
          {!isFocusTimeZero ? "Lucreaza" : "Pauza"}
        </Text>
        <TimmerAnimation />
        <ModalComponent bottomSheetRef={bottomSheetRef} />

        <View style={styles.buttonsContainer}>
          <ButtonComponent
            onPress={handleReset}
            name={"reload-circle-outline"}
            autohide
          />
          <ButtonComponent
            onPress={handleStartCounting}
            name={isCounting ? "pause-circle-outline" : "play-circle-outline"}
          />
          <ButtonComponent
            onPress={openModal}
            name={"list-circle-outline"}
            autohide
          />
        </View>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.focusColos,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 40,
    fontWeight: "700",
    color: colors.white,
    marginBottom: 20,
  },
  buttonsContainer: {
    flexDirection: "row",
    gap: 10,
  },
});

export default CountDown;
