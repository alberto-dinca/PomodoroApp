import React, { Dispatch, SetStateAction } from "react";
import { View, StyleSheet, Text, Modal, TouchableOpacity } from "react-native";
import { colors } from "../constants/colors";
import FormComponent from "./FormComponent";

type ModalComponentProps = {
  onPress: Dispatch<SetStateAction<boolean>>;
  modalVisible: boolean;
};

function ModalComponent({ onPress, modalVisible }: ModalComponentProps) {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => onPress(false)}
    >
      <View style={styles.modalContainer}>
        <FormComponent />
        <View style={styles.btnContainer}>
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
});

export default ModalComponent;
