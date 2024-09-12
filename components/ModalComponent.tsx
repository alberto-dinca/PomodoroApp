import React, { Dispatch, SetStateAction, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Modal,
  TouchableOpacity,
  Switch,
} from "react-native";
import { colors } from "../constants/colors";
import SliderComponent from "./SliderComponent";
import { storeType } from "../store/store";
import { useDispatch, useSelector } from "react-redux";
import { updateinitialState } from "../store/appSlice";

type ModalComponentProps = {
  onPress: Dispatch<SetStateAction<boolean>>;
  modalVisible: boolean;
};

function ModalComponent({ onPress, modalVisible }: ModalComponentProps) {
  const [disableBtn, setDisableBtn] = useState(true);
  const [isLongInterval, setIsLongInterval] = useState(false);

  const dispatch = useDispatch();
  const { breakTime: newBreakTime, focusTime: newFocusTime } = useSelector(
    (state: storeType) => state.newIntervals
  );
  const { breakTime: currentBreakTime, focusTime: currentFocussTime } =
    useSelector((state: storeType) => state.timeIntervals);

  const newIntervalsObject = {
    focusTimePerriod: newFocusTime,
    breakTimePerriod: newBreakTime,
  };

  const submitNewIntervals = () => {
    dispatch(updateinitialState(newIntervalsObject));
    setDisableBtn(true);
  };

  const btnIsdisabled = () => {
    if (
      newFocusTime === currentFocussTime &&
      newBreakTime === currentBreakTime
    ) {
      return setDisableBtn(true);
    } else {
    }
    setDisableBtn(false);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => onPress(false)}
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
          <View style={styles.switchContainer}>
            <Text style={styles.swithcText}>Intervale lungi</Text>
            <Switch
              value={isLongInterval}
              onChange={() => setIsLongInterval(!isLongInterval)}
            />
          </View>
        </View>
        <View style={styles.btnContainer}>
          {/* TODO De creat componenta reutilizatila pentru butoane modal */}
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
          <TouchableOpacity onPress={() => onPress(false)} style={styles.btn}>
            <Text style={styles.btnText}>Inchide</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: colors.white,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    padding: 10,
  },
  btnContainer: {
    width: "100%",
    flexDirection: "row",
    gap: 20,
    paddingHorizontal: 20,
    justifyContent: "center",
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
  },
  switchContainer: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 5,
  },
  swithcText: {
    fontSize: 18,
    fontWeight: "700",
  },
});

export default ModalComponent;
