import React, { useEffect, useRef } from "react";
import { View, StyleSheet, Text } from "react-native";
import * as Notifications from "expo-notifications";
import { colors } from "../constants/colors";
import TimmerAnimation from "./TimmerAnimation";
import { useDispatch, useSelector } from "react-redux";
import {
  newStoreIntervals,
  reset,
  setBreakTime,
  setFocusTime,
  setIsCounting,
  setIsPause,
} from "../store/appSlice";
import { storeType } from "../store/store";
import ButtonComponent from "./ButtonComponent";
import ModalComponent from "./ModalComponent";
import BottomSheet from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { setIsModalVisible } from "../store/settingsSlice";

function CountDown() {
  const { breakTime: breakTimePerriod } = newStoreIntervals;
  const { focusTime, breakTime, isCounting, isPause } = useSelector(
    (state: storeType) => state.timeIntervals
  );

  const dispatch = useDispatch();

  const scheduleNotifications = async (title: string, body: string) => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: title,
        body: body,
      },
      trigger: null,
    });
  };

  const displayNotification = () => {
    if (!isPause && focusTime === 0 && breakTime === breakTimePerriod) {
      scheduleNotifications("Pauza", "Este timpul sa luati o pauza");
      dispatch(setIsPause());
      dispatch(setIsCounting());
    } else if (breakTime === 0) {
      scheduleNotifications(
        "Pomodoro finalizat",
        "Ati finalizat o sesiune Pomodoro"
      );
      dispatch(reset());
    }
  };

  const countDown = () => {
    if (focusTime !== 0) {
      dispatch(setFocusTime());
    } else {
      dispatch(setBreakTime());
    }
  };

  useEffect(() => {
    if (isCounting) {
      displayNotification();
      const interval = setInterval(() => countDown(), 60000);
      return () => clearInterval(interval);
    }
  }, [isCounting, focusTime, breakTime]);

  const bottomSheetRef = useRef<BottomSheet>(null);
  const openModal = () => {
    dispatch(setIsModalVisible(true));
  };

  return (
    <GestureHandlerRootView>
      <View
        style={[
          styles.container,
          {
            backgroundColor:
              focusTime > 0 ? colors.focusColos : colors.breakColor,
          },
        ]}
      >
        <Text style={styles.title}>{focusTime > 0 ? "Lucreaza" : "Pauza"}</Text>
        <TimmerAnimation />
        <ModalComponent
          bottomSheetRef={bottomSheetRef}
          setIsModalVisible={setIsModalVisible}
        />

        <View style={styles.buttonsContainer}>
          <ButtonComponent
            onPress={() => dispatch(reset())}
            name={"reload-circle-outline"}
            autohide
          />
          <ButtonComponent
            onPress={() => dispatch(setIsCounting())}
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
