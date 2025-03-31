import { View, Text, StyleSheet, TextInput } from "react-native";
import React from "react";
import { Colors } from "react-native/Libraries/NewAppScreen";

type Props = {};

const InputField = (props: React.ComponentProps<typeof TextInput>) => {
  return <TextInput style={styles.input} {...props} />;
};

export default InputField;

const styles = StyleSheet.create({
  input: {
    backgroundColor: Colors.white,
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 5,
    alignSelf: "stretch",
    fontSize: 16,
    color: Colors.black,
    marginBottom: 20,
  },
});
