import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { colors } from "../constants/colors";
import { newStoreIntervals, updateinitialState } from "../store/appSlice";
import { useDispatch } from "react-redux";

function FormComponent() {
  const { breakTime, focusTime } = newStoreIntervals;

  const [newIntervals, setNewIntervals] = useState({
    focusTimePerriod: focusTime,
    breakTimePerriod: breakTime,
  });

  const dispatch = useDispatch();

  const handleFocusTimeChanges = (input: string) => {
    const numericInput = parseInt(input);
    setNewIntervals({ ...newIntervals, focusTimePerriod: numericInput });
  };

  const handleBreakTimeChanges = (input: string) => {
    const numericInput = parseInt(input);
    setNewIntervals({ ...newIntervals, breakTimePerriod: numericInput });
  };

  const submitNewIntervals = () => {
    dispatch(updateinitialState(newIntervals));
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.textInputLabel}>
          Completati durata pentru focus
        </Text>
        <TextInput
          onChangeText={handleFocusTimeChanges}
          value={newIntervals.focusTimePerriod.toString()}
          style={styles.textInput}
        />
        <Text style={styles.textInputLabel}>
          Completati durata pentru pauza
        </Text>
        <TextInput
          onChangeText={handleBreakTimeChanges}
          value={newIntervals.breakTimePerriod.toString()}
          style={styles.textInput}
        />
      </View>
      <TouchableOpacity onPress={submitNewIntervals} style={styles.btn}>
        <Text style={styles.btnText}>Salveaza</Text>
      </TouchableOpacity>
      {/* TODO De creat componenta reutilizatila pentru butoane modal */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  textInput: {
    backgroundColor: "lightgray",
    color: "black",
    width: 300,
    marginBottom: 10,
    fontSize: 18,
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderRadius: 10,
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
  textInputLabel: {
    fontSize: 20,
    fontWeight: "700",
  },
});

export default FormComponent;
