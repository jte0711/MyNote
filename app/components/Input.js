import React from "react";
import { StyleSheet, TextInput } from "react-native";
import colors from "../config/colors";

export default function Input({ style, value = null, ...otherProps }) {
  return (
    <TextInput
      style={[styles.input, style]}
      {...otherProps}
      defaultValue={value}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    height: 45,
    marginTop: 15,
    fontSize: 18,
    paddingLeft: 20,
    borderStyle: "solid",
    borderColor: "#939F9F",
    borderWidth: 2,
    borderRadius: 15,
  },
});
