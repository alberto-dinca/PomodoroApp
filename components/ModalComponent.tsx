import React, { useEffect, useMemo, useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Switch } from "react-native";
import { colors } from "../constants/colors";
import SliderComponent from "./SliderComponent";
import { storeType } from "../store/store";
import { useDispatch, useSelector } from "react-redux";
import {
  displayModal,
  newStoreIntervals,
  updateinitialState,
} from "../store/appSlice";
import BottomSheet from "@gorhom/bottom-sheet";

import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { setPersistedIntervals } from "../store/persistedSlice";

type ModalComponentProps = {
  bottomSheetRef: React.RefObject<BottomSheetMethods>;
};

function ModalComponent({ bottomSheetRef }: ModalComponentProps) {
  const [disableBtn, setDisableBtn] = useState(true);
  const [isLongInterval, setIsLongInterval] = useState(false);

  const snapPoints = useMemo(() => ["100%"], []);

  const dispatch = useDispatch();

  const { breakTime: sliderBreakTime, focusTime: sliderFocusTime } =
    useSelector((state: storeType) => state.newIntervals);

  const { breakTime: currentBreakInterval, focusTime: currentFocussInterval } =
    newStoreIntervals;

  const {
    breakTimePerriod: persistedBreakTimePerriod,
    focusTimePerriod: persistedFocusTimePerriod,
  } = useSelector((state: storeType) => state.persistedIntervals);

  const { modalVisible } = useSelector(
    (state: storeType) => state.timeIntervals
  );

  useEffect(() => {
    if (persistedFocusTimePerriod) {
      dispatch(
        updateinitialState({
          focusTimePerriod: persistedFocusTimePerriod,
          breakTimePerriod: persistedBreakTimePerriod,
        })
      );
    }
  }, []);

  const newIntervalsObject = {
    focusTimePerriod: sliderFocusTime,
    breakTimePerriod: sliderBreakTime,
  };

  const submitNewIntervals = () => {
    dispatch(updateinitialState(newIntervalsObject));
    dispatch(setPersistedIntervals(newIntervalsObject));
    setDisableBtn(true);
    handleOnCloseModal();
  };

  const btnIsdisabled = () => {
    if (
      sliderFocusTime === currentFocussInterval &&
      sliderBreakTime === currentBreakInterval
    ) {
      return setDisableBtn(true);
    } else {
    }
    setDisableBtn(false);
  };

  const handleOnCloseModal = () => {
    bottomSheetRef.current?.close();
    dispatch(displayModal(false));
  };

  return (
    modalVisible && (
      <View style={styles.container}>
        <BottomSheet
          index={0}
          snapPoints={snapPoints}
          ref={bottomSheetRef}
          enablePanDownToClose={true}
          enableContentPanningGesture={false}
          handleIndicatorStyle={{ backgroundColor: colors.darkGray }}
          onClose={handleOnCloseModal}
        >
          <View style={styles.modalContainer}>
            <View style={styles.sliderContainer}>
              <SliderComponent
                interval="focusTime"
                title="Selectati intervalul pentru lucrat"
                btnIsdisabled={btnIsdisabled}
                isLongInterval={isLongInterval}
              />
              <SliderComponent
                interval="breakTime"
                title="Selectati intervalul pentru pauza"
                btnIsdisabled={btnIsdisabled}
                isLongInterval={isLongInterval}
              />
            </View>
            <View style={styles.switchContainer}>
              <Text style={styles.switchText}>Intervale lungi</Text>
              <Switch
                value={isLongInterval}
                onChange={() => setIsLongInterval(!isLongInterval)}
              />
            </View>

            <View style={styles.btnContainer}>
              <TouchableOpacity
                onPress={submitNewIntervals}
                disabled={disableBtn}
                style={[
                  styles.btn,
                  disableBtn && { backgroundColor: colors.darkGray },
                ]}
              >
                <Text style={styles.btnText}>Salveaza</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => bottomSheetRef.current?.close()}
                style={styles.btn}
              >
                <Text style={styles.btnText}>Inchide</Text>
              </TouchableOpacity>
            </View>
          </View>
        </BottomSheet>
      </View>
    )
  );
}

const styles = StyleSheet.create({
  container: {
    zIndex: 1,
    height: 250,
    width: "100%",
    position: "absolute",
    bottom: 0,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: colors.white,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  btnContainer: {
    width: "100%",
    flexDirection: "row",
    gap: 20,
    paddingHorizontal: 20,
    justifyContent: "center",
    marginBottom: 10,
  },
  btn: {
    width: 100,
    padding: 5,
    borderRadius: 10,
    backgroundColor: colors.blue,
    justifyContent: "center",
    alignItems: "center",
  },
  btnText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: "700",
  },
  sliderContainer: {
    width: "100%",
    gap: 10,
  },
  switchContainer: {
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 5,
  },
  switchText: {
    fontSize: 18,
    fontWeight: "700",
  },
});

export default ModalComponent;
